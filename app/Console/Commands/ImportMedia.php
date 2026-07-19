<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ImportMedia extends Command
{
    protected $signature = 'import:media';
    protected $description = 'Import images from WordPress uploads to Laravel storage';

    public function handle(): int
    {
        $this->info('Copying images from WordPress uploads...');

        $wpUploads = 'C:/laragon/www/eventsquare/wp-content/uploads';
        $laravelStorage = storage_path('app/public/uploads');

        if (!is_dir($wpUploads)) {
            $this->error("WordPress uploads not found at: $wpUploads");
            $this->line('Skipping image import. Images can be copied manually later.');
            return self::FAILURE;
        }

        if (!is_dir($laravelStorage)) {
            mkdir($laravelStorage, 0755, true);
        }

        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($wpUploads, \RecursiveDirectoryIterator::SKIP_DOTS)
        );

        $copied = 0;
        $bar = $this->output->createProgressBar(iterator_count($files));
        $bar->start();

        foreach ($files as $file) {
            $relativePath = $files->getSubPathname();
            $destPath = $laravelStorage . '/' . $relativePath;

            $destDir = dirname($destPath);
            if (!is_dir($destDir)) {
                mkdir($destDir, 0755, true);
            }

            if (copy($file->getPathname(), $destPath)) {
                $copied++;
            }

            $bar->advance();
        }

        $bar->finish();
        $this->info("\nCopied $copied images to storage/app/public/uploads/");
        $this->line("Run 'php artisan storage:link' to make them accessible.");

        return self::SUCCESS;
    }
}
