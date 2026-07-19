<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ImportUsers extends Command
{
    protected $signature = 'import:users {--limit= : Limit number of users}';
    protected $description = 'Import users from wp_users.json with WP password hashes';

    public function handle(): int
    {
        $path = storage_path('app/wp_users.json');
        if (!file_exists($path)) {
            $this->error("File not found: $path");
            return self::FAILURE;
        }

        $raw = file_get_contents($path);
        $raw = preg_replace('/^\xEF\xBB\xBF/', '', $raw);
        $wpUsers = json_decode($raw, true);
        if (!$wpUsers) {
            $this->error('Failed to parse JSON');
            return self::FAILURE;
        }

        if ($limit = $this->option('limit')) {
            $wpUsers = array_slice($wpUsers, 0, (int) $limit);
        }

        $this->info('Importing ' . count($wpUsers) . ' users...');
        $bar = $this->output->createProgressBar(count($wpUsers));
        $bar->start();

        $imported = 0;
        $skipped = 0;

        foreach ($wpUsers as $wp) {
            try {
                $email = $wp['user_email'] ?? '';
                $login = $wp['user_login'] ?? '';
                $name = $wp['display_name'] ?: $login;

                if (empty($email)) {
                    $skipped++;
                    $bar->advance();
                    continue;
                }

                if (User::where('email', $email)->exists()) {
                    $skipped++;
                    $bar->advance();
                    continue;
                }

                User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => '$wp$' . ($wp['user_pass'] ?? ''),
                ]);

                $imported++;
            } catch (\Exception $e) {
                $this->warn("\n  Error on {$wp['user_login']}: {$e->getMessage()}");
                $skipped++;
            }

            $bar->advance();
        }

        $bar->finish();
        $this->info("\nImported: $imported | Skipped: $skipped");

        return self::SUCCESS;
    }
}
