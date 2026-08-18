<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

trait UploadsFiles
{
    /** Real MIME types allowed for uploads (SVG deliberately excluded — stored XSS). */
    protected array $allowedUploadMimes = [
        'image/jpeg',
        'image/png',
        'image/webp',
    ];

    /**
     * Validate and store an uploaded image on the private-rooted `public` disk
     * (storage/app/public — served only via the /storage symlink).
     * Returns the stored relative path, or null when no valid file was sent.
     */
    protected function uploadFile(Request $request, string $field = 'cover_image', string $dir = 'listings', int $maxKb = 5120): ?string
    {
        if (! $request->hasFile($field)) {
            return null;
        }

        $file = $request->file($field);

        if (! $file->isValid()) {
            throw ValidationException::withMessages([$field => 'فشل رفع الملف، حاول مرة أخرى.']);
        }

        if ($file->getSize() > $maxKb * 1024) {
            throw ValidationException::withMessages([$field => "حجم الملف يتجاوز {$maxKb} كيلوبايت."]);
        }

        // Trust the server-detected MIME type, never the client-provided extension.
        if (! in_array($file->getMimeType(), $this->allowedUploadMimes, true)) {
            throw ValidationException::withMessages([$field => 'نوع الملف غير مسموح. الصيغ المقبولة: JPG, PNG, WEBP.']);
        }

        // store() generates a random hashed filename — no user-controlled names on disk.
        return $file->store($dir, 'public');
    }

    /** Delete a previously stored upload (safely ignores missing files). */
    protected function deleteUpload(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
