<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name_ar' => 'الفعاليات الترفيهية', 'name_en' => 'Entertainment Events', 'slug' => 'entertainment-events', 'type' => 'tag'],
            ['name_ar' => 'الحفلات الموسيقية', 'name_en' => 'Music Concerts', 'slug' => 'music-concerts', 'type' => 'tag'],
            ['name_ar' => 'المعارض والمؤتمرات', 'name_en' => 'Exhibitions & Conferences', 'slug' => 'exhibitions-conferences', 'type' => 'tag'],
            ['name_ar' => 'الفعاليات الثقافية', 'name_en' => 'Cultural Events', 'slug' => 'cultural-events', 'type' => 'tag'],
            ['name_ar' => 'الفعاليات الرياضية', 'name_en' => 'Sports Events', 'slug' => 'sports-events', 'type' => 'tag'],
            ['name_ar' => 'الفعاليات القادمة', 'name_en' => 'Upcoming Events', 'slug' => 'upcoming-events', 'type' => 'tag'],
            ['name_ar' => 'القصور والقرى', 'name_en' => 'Palaces & Villages', 'slug' => 'palaces-villages', 'type' => 'tag'],
            ['name_ar' => 'المعالم والمنتزهات', 'name_en' => 'Landmarks & Parks', 'slug' => 'landmarks-parks', 'type' => 'tag'],
            ['name_ar' => 'المتاحف والأسواق', 'name_en' => 'Museums & Markets', 'slug' => 'museums-markets', 'type' => 'tag'],
            ['name_ar' => 'المأكولات والمشروبات', 'name_en' => 'Food & Drinks', 'slug' => 'food-drinks', 'type' => 'tag'],
            ['name_ar' => 'الإقامة والتسوق', 'name_en' => 'Accommodation & Shopping', 'slug' => 'accommodation-shopping', 'type' => 'tag'],
            ['name_ar' => 'الأنشطة والتجارب', 'name_en' => 'Activities & Experiences', 'slug' => 'activities-experiences', 'type' => 'tag'],
            ['name_ar' => 'العروض والإعلانات', 'name_en' => 'Offers & Ads', 'slug' => 'offers-ads', 'type' => 'category'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
