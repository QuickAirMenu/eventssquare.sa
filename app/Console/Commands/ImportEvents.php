<?php

namespace App\Console\Commands;

use App\Models\Event;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class ImportEvents extends Command
{
    protected $signature = 'import:events {--limit= : Limit number of posts}';
    protected $description = 'Import events from wp_posts.json';

    public function handle(): int
    {
        $path = storage_path('app/wp_posts.json');
        if (!file_exists($path)) {
            $this->error("File not found: $path");
            return self::FAILURE;
        }

        $raw = file_get_contents($path);
        $raw = preg_replace('/^\xEF\xBB\xBF/', '', $raw);
        $posts = json_decode($raw, true);
        if (!$posts) {
            $this->error('Failed to parse JSON');
            return self::FAILURE;
        }

        if ($limit = $this->option('limit')) {
            $posts = array_slice($posts, 0, (int) $limit);
        }

        $this->info('Importing ' . count($posts) . ' events...');
        $bar = $this->output->createProgressBar(count($posts));
        $bar->start();

        $imported = 0;
        $skipped = 0;

        foreach ($posts as $post) {
            try {
                $title = html_entity_decode($post['post_title'], ENT_QUOTES, 'UTF-8');
                $content = html_entity_decode(wp_strip_all_tags($post['post_content'] ?? ''), ENT_QUOTES, 'UTF-8');
                $slug = $post['post_name'] ?: Str::slug($title);

                if (empty($title) || $title === 'Auto Draft' || str_starts_with($title, 'Elementor #')) {
                    $skipped++;
                    $bar->advance();
                    continue;
                }

                $existing = Event::where('slug', $slug)->first();
                if ($existing) {
                    $slug = $slug . '-' . $post['ID'];
                }

                Event::create([
                    'title_ar' => $title,
                    'title_en' => null,
                    'slug' => $slug,
                    'description_ar' => mb_strlen($content) > 5 ? $content : null,
                    'description_en' => null,
                    'start_date' => $post['post_date'] ?? null,
                    'end_date' => null,
                    'location_name' => null,
                    'location_map' => null,
                    'price' => null,
                    'external_url' => null,
                    'status' => ($post['post_status'] ?? 'draft') === 'publish' ? 'published' : 'draft',
                    'featured' => false,
                    'category_id' => null,
                    'country_id' => null,
                    'favorites_count' => 0,
                    'user_id' => 1,
                ]);

                $imported++;
            } catch (\Exception $e) {
                $this->warn("\n  Error: {$e->getMessage()}");
                $skipped++;
            }

            $bar->advance();
        }

        $bar->finish();
        $this->info("\nImported: $imported | Skipped: $skipped");

        return self::SUCCESS;
    }
}

function wp_strip_all_tags($text)
{
    $text = preg_replace('@<(script|style)[^>]*?>.*?</\\1>@si', '', $text);
    $text = strip_tags($text);
    return trim($text);
}
