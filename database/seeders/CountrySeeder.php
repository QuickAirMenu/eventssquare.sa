<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['name_ar' => 'أبها', 'name_en' => 'Abha', 'slug' => 'abha', 'events_count' => 81],
            ['name_ar' => 'خميس مشيط', 'name_en' => 'Khamis Mushait', 'slug' => 'khamis-mushait', 'events_count' => 15],
            ['name_ar' => 'عسير', 'name_en' => 'Asir', 'slug' => 'asir', 'events_count' => 4],
            ['name_ar' => 'السودة', 'name_en' => 'Al-Soudah', 'slug' => 'al-soudah', 'events_count' => 5],
            ['name_ar' => 'النماص', 'name_en' => 'Al-Namas', 'slug' => 'al-namas', 'events_count' => 3],
            ['name_ar' => 'المسقي', 'name_en' => 'Al-Masqi', 'slug' => 'al-masqi', 'events_count' => 2],
            ['name_ar' => 'رجال ألمع', 'name_en' => 'Rijal Alma', 'slug' => 'rijal-alma', 'events_count' => 2],
            ['name_ar' => 'أحد رفيدة', 'name_en' => 'Ahad Rafidah', 'slug' => 'ahad-rafidah', 'events_count' => 1],
            ['name_ar' => 'الفرعاء', 'name_en' => 'Al-Faraa', 'slug' => 'al-faraa', 'events_count' => 1],
            ['name_ar' => 'محايل عسير', 'name_en' => 'Muhayil Asir', 'slug' => 'muhayil-asir', 'events_count' => 1],
            ['name_ar' => 'تنومة', 'name_en' => 'Tanomah', 'slug' => 'tanomah', 'events_count' => 1],
            ['name_ar' => 'الواديين', 'name_en' => 'Al-Wadiyeen', 'slug' => 'al-wadiyeen', 'events_count' => 1],
            ['name_ar' => 'باحة ربيعة', 'name_en' => 'Bahat Rabiah', 'slug' => 'bahat-rabiah', 'events_count' => 1],
            ['name_ar' => 'بيشة', 'name_en' => 'Bisha', 'slug' => 'bisha', 'events_count' => 1],
            ['name_ar' => 'السمر', 'name_en' => 'Al-Samr', 'slug' => 'al-samr', 'events_count' => 1],
            ['name_ar' => 'الإلكتروني', 'name_en' => 'Online', 'slug' => 'online', 'events_count' => 1],
            ['name_ar' => 'القحمة', 'name_en' => 'Al-Qahmah', 'slug' => 'al-qahmah', 'events_count' => 1],
            ['name_ar' => 'البرك', 'name_en' => 'Al-Birk', 'slug' => 'al-birk', 'events_count' => 1],
            ['name_ar' => 'تنمية', 'name_en' => 'Tanmiyah', 'slug' => 'tanmiyah', 'events_count' => 1],
        ];

        foreach ($countries as $country) {
            Country::create($country);
        }
    }
}
