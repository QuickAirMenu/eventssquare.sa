<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\City;
use App\Models\Event;
use App\Models\Listing;
use App\Models\Offer;
use App\Models\Setting;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedRolesAndAdmin();
        $this->seedSettings();
        $this->seedCities();
        $this->seedCategories();
        $this->seedListings();
        $this->seedEvents();
        $this->seedOffers();
        $this->seedTestimonials();
    }

    protected function seedRolesAndAdmin(): void
    {
        foreach (['admin', 'editor', 'user'] as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $adminEmail = config('seed.admin_email');
        $adminPassword = config('seed.admin_password');
        $editorEmail = config('seed.editor_email');
        $editorPassword = config('seed.editor_password');

        if (! $adminEmail || ! $adminPassword) {
            throw new \RuntimeException('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env before seeding.');
        }

        $admin = User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'مدير المنصة',
                'password' => Hash::make($adminPassword),
            ]
        );
        $admin->assignRole('admin');

        if ($editorEmail && $editorPassword) {
            User::firstOrCreate(
                ['email' => $editorEmail],
                [
                    'name' => 'محرر المحتوى',
                    'password' => Hash::make($editorPassword),
                ]
            )->assignRole('editor');
        }
    }

    protected function seedSettings(): void
    {
        $defaults = [
            'site_name' => 'ساحة الفعاليات',
            'site_tagline' => 'اكتشف عسير — الطبيعة، الثقافة، المغامرة',
            'site_description' => 'منصة الكترونية تفاعلية تهتم في إثراء الحياة ورسم البهجة وخلق عالم من الخيال في معالم ووجهات سياحية أثرية متنوعة في منطقة عسير.',
            'email' => 'Hello@EventsSquare.sa',
            'phone' => '+966554657517',
            'whatsapp' => '+966554657517',
            'address' => 'أبها، منطقة عسير، المملكة العربية السعودية',
            'twitter' => 'https://x.com/eventssquare_sa',
            'instagram' => 'https://www.instagram.com/events.square',
            'snapchat' => 'https://t.snapchat.com/9wUjXwds',
            'tiktok' => 'https://www.tiktok.com/@eventssquare_sa',
            'newsletter_enabled' => '1',
        ];

        foreach ($defaults as $key => $value) {
            Setting::set($key, $value);
        }
    }

    protected function seedCities(): void
    {
        $cities = [
            ['name' => 'أبها', 'name_en' => 'Abha'],
            ['name' => 'خميس مشيط', 'name_en' => 'Khamis Mushait'],
            ['name' => 'بللسمر', 'name_en' => 'Billasmar'],
            ['name' => 'السودة', 'name_en' => 'Al Soudah'],
            ['name' => 'رجال ألمع', 'name_en' => 'Rijal Almaa'],
            ['name' => 'النماص', 'name_en' => 'Al Namas'],
            ['name' => 'محايل عسير', 'name_en' => 'Muhayil Asir'],
        ];

        foreach ($cities as $city) {
            City::firstOrCreate(['name' => $city['name']], $city);
        }
    }

    protected function seedCategories(): void
    {
        $destinations = Category::firstOrCreate(
            ['slug' => 'destinations'],
            [
                'name' => 'الوجهات',
                'name_en' => 'Destinations',
                'type' => 'destination',
                'icon' => 'map-pin',
                'sort_order' => 1,
            ]
        );

        $subs = [
            ['name' => 'القصور والقرى التراثية', 'name_en' => 'Palaces & Heritage Villages', 'slug' => 'palaces-heritage-villages', 'icon' => 'castle', 'sort_order' => 1],
            ['name' => 'المعالم والمنتزهات', 'name_en' => 'Landmarks & Parks', 'slug' => 'landmarks-parks', 'icon' => 'tree', 'sort_order' => 2],
            ['name' => 'المتاحف والأسواق', 'name_en' => 'Museums & Souks', 'slug' => 'museums-souks', 'icon' => 'museum', 'sort_order' => 3],
            ['name' => 'الإقامة والتسوق', 'name_en' => 'Stay & Shopping', 'slug' => 'stay-shopping', 'icon' => 'bed', 'sort_order' => 4],
            ['name' => 'المأكولات والمشروبات', 'name_en' => 'Food & Beverages', 'slug' => 'food-drinks', 'icon' => 'utensils', 'sort_order' => 5],
        ];

        foreach ($subs as $sub) {
            Category::firstOrCreate(
                ['slug' => $sub['slug']],
                [...$sub, 'parent_id' => $destinations->id, 'type' => 'destination']
            );
        }

        Category::firstOrCreate(
            ['slug' => 'events'],
            ['name' => 'الفعاليات', 'name_en' => 'Events', 'type' => 'event', 'icon' => 'ticket', 'sort_order' => 2]
        );

        Category::firstOrCreate(
            ['slug' => 'activities'],
            ['name' => 'الأنشطة والتجارب', 'name_en' => 'Activities & Experiences', 'type' => 'activity', 'icon' => 'compass', 'sort_order' => 3]
        );

        Category::firstOrCreate(
            ['slug' => 'offers'],
            ['name' => 'العروض والإعلانات', 'name_en' => 'Offers & Ads', 'type' => 'offer', 'icon' => 'badge-percent', 'sort_order' => 4]
        );
    }

    protected function seedListings(): void
    {
        $abha = City::where('name', 'أبها')->first();
        $khamis = City::where('name', 'خميس مشيط')->first();
        $billasmar = City::where('name', 'بللسمر')->first();
        $soudah = City::where('name', 'السودة')->first();
        $rjal = City::where('name', 'رجال ألمع')->first();

        $cat = fn (string $slug) => Category::where('slug', $slug)->first()?->id;

        $listings = [
            [
                'category_id' => $cat('landmarks-parks'), 'city_id' => $abha->id,
                'name' => 'فعالية مدماك', 'name_en' => 'Madmak',
                'slug' => 'madmak',
                'cover_image' => '/img/madmak.jpeg',
                'summary' => 'فعالية ترفيهية بتصميم معماري مستلهم من روح عسير المدمجة بالحداثة، تقع بالقرب من منتزه السحاب على إطلالة ساحرة.',
                'description' => 'هي فعالية ترفيهية تم تصميمها بأسلوب معماري مستلهم من روح عسير المدمجة بالحداثة، تقع بالقرب من منتزه السحاب على إطلالة ساحرة، وتضم مجموعة من التجارب الترفيهية والفعاليات التفاعلية لجميع أفراد العائلة.',
                'is_featured' => true,
            ],
            [
                'category_id' => $cat('stay-shopping'), 'city_id' => $abha->id,
                'name' => 'مزرعة الليوان', 'name_en' => 'Laiwan Farm',
                'slug' => 'laiwan-farm',
                'cover_image' => '/img/liwana.jpeg',
                'summary' => 'مزرعة وبيت طين تم تطويره وتحويله إلى وجهة سياحية محلية تراثية مستوحاة من ثقافة المنطقة.',
                'description' => 'تقع مزرعة الليوان في مدينة أبها في قرية آل يوسف التراثية، ويمتاز موقعها بوجود مزرعة وبيت طين تم تطويره وتحويله إلى وجهة سياحية محلية تراثية مستوحاة من ثقافة المنطقة.',
                'is_featured' => true,
            ],
            [
                'category_id' => $cat('landmarks-parks'), 'city_id' => $abha->id,
                'name' => 'حديقة المشهد', 'name_en' => 'Al Mashhad Park',
                'slug' => 'mashhad-park',
                'cover_image' => '/img/mashhad.jpeg',
                'summary' => 'حديقة طبيعية تضم مرافق للعائلات وألعاباً للأطفال ومنافذ لبيع الوجبات والأكلات التراثية والمحلية.',
                'description' => 'استكشف حديقة المشهد ومساحتها الطبيعية، تضم مرافق للعائلات وألعاب للأطفال ومنافذ لبيع الوجبات والأكلات التراثية والمحلية.',
            ],
            [
                'category_id' => $cat('landmarks-parks'), 'city_id' => $abha->id,
                'name' => 'ممشى ساحة الوطن', 'name_en' => 'Sahat Al Watan Walkway',
                'slug' => 'sahat-al-watan',
                'cover_image' => '/img/mamsha.jpeg',
                'summary' => 'ممشى حيوي ومنعش يحتوي على مرافق من مقاعد للجلوس ومواقف للسيارات ومسار للمشي.',
                'description' => 'استمتع بلحظات حيوية ومنعشة في ممشى ساحة الوطن الذي يحتوي على مرافق من مقاعد للجلوس ومواقف للسيارات ومسار للمشي.',
            ],
            [
                'category_id' => $cat('landmarks-parks'), 'city_id' => $billasmar->id,
                'name' => 'شعف آل خريم', 'name_en' => 'Shaaf Al Khuraym',
                'slug' => 'shaaf-al-khuraym',
                'cover_image' => '/img/shaaf.jpeg',
                'summary' => 'منتزه يرتفع قرابة 2800 متر فوق سطح البحر، يتميز بكثافة أشجار العرعر وسهولة التنقل.',
                'description' => 'منتزه الشعف آل خريم يرتفع قرابة 2800 متراً فوق سطح البحر، ويتميز بكثافة أشجار العرعر وسهولة التنقل بين الممرات والأشجار.',
            ],
            [
                'category_id' => $cat('landmarks-parks'), 'city_id' => $soudah->id,
                'name' => 'وادي عين الذيبة', 'name_en' => 'Ain Al Thaibah Valley',
                'slug' => 'ain-al-thaibah',
                'cover_image' => '/img/ain.jpeg',
                'summary' => 'أحد أبرز معالم الجذب الطبيعية في منطقة عسير، تضم مجموعة من الشلالات المذهلة ذات المياه العذبة.',
                'description' => 'تعد عين الذيبة واحدة من أبرز معالم الجذب الطبيعية في منطقة عسير، تضم مجموعة من الشلالات المذهلة ذات المياه العذبة ويوجد بها مختلف النباتات.',
            ],
            [
                'category_id' => $cat('palaces-heritage-villages'), 'city_id' => $abha->id,
                'name' => 'قصر مالك التاريخي', 'name_en' => 'Malik Historical Palace',
                'slug' => 'malik-palace',
                'cover_image' => '/img/malk.jpeg',
                'summary' => 'يتجسد التاريخ والولاء، استمتع بمشاهدة القطع الأثرية والوثائق في قلب القصر والطبيعة المحيطة.',
                'description' => 'قصر مالك التاريخي، يتجسد فيه التاريخ والولاء، استمتع بمشاهدة القطع الأثرية والوثائق في قلب القصر والطبيعة المحيطة من إطلالته الساحرة على المزارع المحيطة.',
                'is_featured' => true,
            ],
            [
                'category_id' => $cat('palaces-heritage-villages'), 'city_id' => $abha->id,
                'name' => 'قلعة شمسان التاريخية', 'name_en' => 'Shamsan Historical Castle',
                'slug' => 'shamsan-castle',
                'cover_image' => '/img/shamsan.jpg',
                'summary' => 'قلعة شيدت على جبل شمسان وتعتبر مثالاً بارزاً للأسلوب والفنون المعمارية التقليدية.',
                'description' => 'قلعة شمسان التاريخية في أبها يعود تاريخ تشييدها بتصميمها الأخير إلى أكثر من 100 عام، وشيدت على جبل شمسان وتعتبر مثالاً بارزاً للأسلوب والفنون المعمارية التقليدية.',
            ],
            [
                'category_id' => $cat('palaces-heritage-villages'), 'city_id' => $abha->id,
                'name' => 'قصر شدا التاريخي', 'name_en' => 'Shada Historical Palace',
                'slug' => 'shada-palace',
                'cover_image' => '/img/shada.jpeg',
                'summary' => 'المعلم التاريخي البارز الممتد لأعوام، مبني على نمط عمارة عسير من الحجارة.',
                'description' => 'استعد للانغماس في مدينة أبها بتاريخ قصر شدا، المعلم التاريخي البارز الممتد لأعوام والمبني على نمط عمارة عسير، بني القصر من الحجارة مع تغطية الجدران بطبقة من الجص من الداخل والخارج.',
            ],
            [
                'category_id' => $cat('palaces-heritage-villages'), 'city_id' => $abha->id,
                'name' => 'قرية المفتاحة التشكيلية', 'name_en' => 'Al Muftaha Art Village',
                'slug' => 'muftaha-village',
                'cover_image' => '/img/muftaha.jpeg',
                'summary' => 'تحفة معمارية تجمع بين الفن والإلهام والأصالة وتوفر تجربة سياحية فريدة.',
                'description' => 'قرية المفتاحة تحفة معمارية تجمع بين الفن والإلهام والأصالة، وتوفر تجربة سياحية فريدة تأخذ الزائر في رحلة عبر التاريخ والثقافة المحلية بأجواء رائعة ومليئة بالحيوية.',
                'is_featured' => true,
            ],
            [
                'category_id' => $cat('palaces-heritage-villages'), 'city_id' => $rjal->id,
                'name' => 'قرية رجال ألمع', 'name_en' => 'Rijal Almaa Village',
                'slug' => 'rijal-almaa',
                'cover_image' => '/img/rigal.jpeg',
                'summary' => 'قرية شيدت مبانيها من الحجر، تعرف على فن القط العسيري وتتمتع بأهمية تاريخية لأكثر من 700 عام.',
                'description' => 'اكتشف جمال وتاريخ القرية التي شيدت مبانيها من الحجر واستمتع بالمعالم الأثرية وتعرف على فن القط العسيري، تتسم أهميتها التاريخية لأكثر من 700 عام.',
                'is_featured' => true,
            ],
            [
                'category_id' => $cat('stay-shopping'), 'city_id' => $abha->id,
                'name' => 'بارك أبها', 'name_en' => 'Abha Park',
                'slug' => 'abha-park',
                'cover_image' => '/img/abha-park.jpeg',
                'summary' => 'وجهة مثالية للعائلة.',
                'description' => 'بارك أبها وجهة مثالية للعائلة مع تجارب ترفيهية متنوعة ومساحات خضراء مريحة.',
            ],
            [
                'category_id' => $cat('stay-shopping'), 'city_id' => $abha->id,
                'name' => 'شالية الندي الخاص', 'name_en' => 'Al Nadi Private Chalet',
                'slug' => 'al-nadi-chalet',
                'cover_image' => '/img/nadee.jpeg',
                'summary' => 'ليلة استثنائية من الراحة والاسترخاء.',
                'description' => 'شالية الندي الخاص يقدم ليلة استثنائية من الراحة والاسترخاء في أجواء مميزة.',
            ],
            [
                'category_id' => $cat('stay-shopping'), 'city_id' => $abha->id,
                'name' => 'فندق انيفيل', 'name_en' => 'Enville Hotel',
                'slug' => 'enville-hotel',
                'cover_image' => '/img/anefiel.jpeg',
                'summary' => 'إقامة فاخرة ولحظات سعيدة.',
                'description' => 'فندق انيفيل يوفر إقامة فاخرة ولحظات سعيدة مع خدمات مميزة وموقع رائع.',
            ],
            [
                'category_id' => $cat('food-drinks'), 'city_id' => $abha->id,
                'name' => 'منش بيكري', 'name_en' => 'Monsh Bakery',
                'slug' => 'monsh-bakery',
                'cover_image' => '/img/munch.jpeg',
                'summary' => 'استمتع بتجربة لا تُنسى في مخبز منش بيكري المعروف بتقديم مجموعة متنوعة من المخبوزات والكعك.',
                'description' => 'استمتع بتجربة لا تُنسى في مخبز منش بيكري المعروف بتقديمه مجموعة متنوعة من المخبوزات والكعك، خاصة كوب كيك اللذيذ.',
            ],
            [
                'category_id' => $cat('food-drinks'), 'city_id' => $abha->id,
                'name' => 'مطعم لاسين La-Scene', 'name_en' => 'La-Scene',
                'slug' => 'la-scene',
                'cover_image' => '/img/lascene.jpeg',
                'summary' => 'تجربة مطعمية راقية بنكهات مميزة.',
                'description' => 'مطعم لاسين La-Scene يقدم تجربة مطعمية راقية بنكهات مميزة.',
            ],
            [
                'category_id' => $cat('food-drinks'), 'city_id' => $abha->id,
                'name' => 'مطعم فلق', 'name_en' => 'Falaq Restaurant',
                'slug' => 'falaq',
                'cover_image' => '/img/falaq.jpeg',
                'summary' => 'طبق في عالم مختلف.',
                'description' => 'مطعم فلق يقدم أطباقاً في عالم مختلف من النكهات.',
            ],
            [
                'category_id' => $cat('food-drinks'), 'city_id' => $abha->id,
                'name' => 'مطعم زورنا', 'name_en' => 'Zourna',
                'slug' => 'zourna',
                'cover_image' => '/img/zorna.jpeg',
                'summary' => 'مطعم يقدم مأكولات متنوعة.',
                'description' => 'مطعم زورنا يقدم مأكولات متنوعة بجودة عالية.',
            ],
            [
                'category_id' => $cat('food-drinks'), 'city_id' => $abha->id,
                'name' => 'مطعم سنسو الإيطالي', 'name_en' => 'Senso Italian Restaurant',
                'slug' => 'senso',
                'cover_image' => '/img/senso.jpeg',
                'summary' => 'نكهات إيطالية أصيلة.',
                'description' => 'مطعم سنسو الإيطالي يقدم نكهات إيطالية أصيلة في أجواء راقية.',
            ],
            [
                'category_id' => $cat('museums-souks'), 'city_id' => $khamis->id,
                'name' => 'صالون نورة القحطاني', 'name_en' => 'Noura Al Qahtani Salon',
                'slug' => 'noura-salon',
                'cover_image' => '/img/salon.jpeg',
                'summary' => 'من الوجهات الرائعة في عالم العناية والجمال.',
                'description' => 'من الوجهات الرائعة في عالم العناية والجمال يقدم خدمات تجميلية من الاعتناء بالأظافر واليدين والمساج والحمام المغربي وتجربة فريدة من الاسترخاء والجمال.',
            ],
            [
                'category_id' => $cat('museums-souks'), 'city_id' => $abha->id,
                'name' => 'متجر الاكواب - يوشا بوتري', 'name_en' => 'Yosha Pottery',
                'slug' => 'yoshapottery',
                'cover_image' => '/img/pottery.jpeg',
                'summary' => 'أكواب فنية مميزة من الخزف.',
                'description' => 'متجر يوشا بوتري يقدم أكواباً فنية مميزة من الخزف بأيدي حرفيين.',
            ],
            [
                'category_id' => $cat('museums-souks'), 'city_id' => $abha->id,
                'name' => 'العبايات - BR BY BATOOL', 'name_en' => 'BR BY BATOOL',
                'slug' => 'br-by-batool',
                'cover_image' => '/img/abaya.jpeg',
                'summary' => 'تشكيلات راقية من العبايات.',
                'description' => 'متجر BR BY BATOOL يقدم تشكيلات راقية من العبايات بتصاميم عصرية.',
            ],
            [
                'category_id' => $cat('museums-souks'), 'city_id' => $abha->id,
                'name' => 'سكتش ارت', 'name_en' => 'Sketch Art',
                'slug' => 'sketch-art',
                'cover_image' => '/img/sketch.jpeg',
                'summary' => 'حين يكون للفن حكاية.',
                'description' => 'متجر سكتش ارت حين يكون للفن حكاية، يقدم قطعاً فنية مميزة.',
            ],
            [
                'category_id' => $cat('museums-souks'), 'city_id' => $abha->id,
                'name' => 'متجر WA', 'name_en' => 'WA Store',
                'slug' => 'wa-store',
                'cover_image' => '/img/wa.jpeg',
                'summary' => 'سلسلة العودة إلى الداخل.',
                'description' => 'متجر WA يقدم سلسلة العودة إلى الداخل بمنتجات تحمل هوية المنطقة.',
            ],
        ];

        foreach ($listings as $listing) {
            Listing::firstOrCreate(
                ['slug' => $listing['slug']],
                [...$listing, 'is_active' => true, 'published_at' => now()]
            );
        }
    }

    protected function seedEvents(): void
    {
        $abha = City::where('name', 'أبها')->first();
        $cat = Category::where('slug', 'events')->first();

        $events = [
            [
                'name' => 'حفلة رابح صقر', 'name_en' => 'Rabeh Saqer Concert',
                'slug' => 'rabeh-saqer',
                'cover_image' => '/img/hero-06.jpeg',
                'city_id' => $abha->id,
                'category_id' => $cat->id,
                'venue' => 'مدينة أبها',
                'description' => 'تطل علينا حفلة الفنان رابح صقر الغنائية ضمن سلسلة حفلات جولة المملكة، في مدينة أبها بأجواء مميزة.',
                'starts_at' => now()->addDays(14),
                'is_featured' => true,
            ],
            [
                'name' => 'كأس السوبر السعودي 2026', 'name_en' => 'Saudi Super Cup 2026',
                'slug' => 'saudi-super-cup-2026',
                'cover_image' => '/img/umsawda.jpeg',
                'city_id' => $abha->id,
                'category_id' => $cat->id,
                'venue' => 'مدينة أبها',
                'description' => 'تستضيف مدينة أبها منافسات بطولة كأس السوبر السعودي بالتزامن مع موسم صيف عسير.',
                'starts_at' => now()->addDays(30),
                'is_featured' => true,
            ],
            [
                'name' => 'باتل كارت', 'name_en' => 'Battle Kart',
                'slug' => 'battle-kart',
                'cover_image' => '/img/kart.png',
                'city_id' => $abha->id,
                'category_id' => $cat->id,
                'venue' => 'أبها',
                'description' => 'فعالية تتميز بوجود أول سباق سيارات كارتنج بمزيج ألعاب الفيديو والواقع المعزز، والكثير من الألعاب المختلفة مثل حلبة سباق السيارات وكرة القدم ولعبة الثعبان.',
                'starts_at' => now()->addDays(7),
            ],
        ];

        foreach ($events as $event) {
            Event::firstOrCreate(
                ['slug' => $event['slug']],
                [...$event, 'status' => 'upcoming']
            );
        }
    }

    protected function seedOffers(): void
    {
        $offers = [
            [
                'title' => 'الأكواب — يوشا بوتري', 'title_en' => 'Cups — Yosha Pottery',
                'slug' => 'yoshapottery-offer',
                'description' => 'استمتع بخصومات على الأكواب الفنية من يوشا بوتري.',
                'link' => 'https://eventssquare-sa.com/yoshapottery/',
                'cover_image' => '/img/pottery.jpeg',
            ],
            [
                'title' => 'العبايات — BR BY BATOOL', 'title_en' => 'Abayas — BR BY BATOOL',
                'slug' => 'br-by-batool-offer',
                'description' => 'تشكيلات جديدة من العبايات بأسعار مميزة.',
                'link' => 'https://eventssquare-sa.com/br-by-batool/',
                'cover_image' => '/img/abaya.jpeg',
            ],
            [
                'title' => 'سكتش ارت', 'title_en' => 'Sketch Art',
                'slug' => 'sketch-art-offer',
                'description' => 'حين يكون للفن حكاية — قطع فنية مميزة بأسعار خاصة.',
                'link' => 'https://eventssquare-sa.com/sketch-art/',
                'cover_image' => '/img/sketch.jpeg',
            ],
            [
                'title' => 'متجر WA — العودة إلى الداخل', 'title_en' => 'WA — Back to Inner',
                'slug' => 'wa-offer',
                'description' => 'سلسلة العودة إلى الداخل بمنتجات تحمل هوية المنطقة.',
                'link' => 'https://eventssquare-sa.com/wa/',
                'cover_image' => '/img/wa.jpeg',
            ],
        ];

        foreach ($offers as $offer) {
            Offer::updateOrCreate(
                ['slug' => $offer['slug']],
                [...$offer, 'is_active' => true]
            );
        }
    }

    protected function seedTestimonials(): void
    {
        $testimonials = [
            [
                'author' => 'أحد العملاء',
                'content' => 'فخورين بتفعيل وتأسيس هذه المنصة الرائعة التي تدعم السياحة وشباب وبنات المنطقة، وتخدم السائحين وكل من له رغبة باستكشاف جمال منطقة عسير.',
                'rating' => 5,
            ],
            [
                'author' => 'عميل المنصة',
                'content' => 'منصة فيها المناطق السياحية في أبها وكل المعلومات التي تحتاجها عن عسير، عن الأماكن التراثية العريقة والسياحية والمطاعم المشهورة. بالتوفيق للقائمين عليها.',
                'rating' => 5,
            ],
            [
                'author' => 'عميل الضيافة',
                'content' => 'منصة ساحة الفعاليات تعكس بشكل جميل التراث والثقافة المحلية، إنها منصة رائعة لمعرفة الفعاليات الجديدة والمعاصرة على حد سواء.',
                'rating' => 5,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::firstOrCreate(
                ['content' => $testimonial['content']],
                [...$testimonial, 'is_active' => true]
            );
        }
    }
}
