<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * خريطة تحويل سلاغات فئات الوجهات من العربية إلى الإنجليزية.
     * صادرة من المنسّق — لا تُغيّر.
     *
     * @var array<string, string>
     */
    private const SLUG_MAP = [
        'قصور-وقرى-تراثية'   => 'palaces-heritage-villages',
        'معالم-ومنتزهات'     => 'landmarks-parks',
        'متاحف-وأسواق-شعبية' => 'museums-souks',
        'الإقامة-والتسوق'     => 'stay-shopping',
        'مأكولات-ومشروبات'   => 'food-drinks',
    ];

    /**
     * ترحيل اندماجي متسامح:
     *  - وُجد الصفان (عربي + إنجليزي): انقل مراجع listings/events إلى الإنجليزي ثم احذف العربي.
     *  - وُجد العربي فقط: حدّث سلاغه إلى الإنجليزي.
     *  - وُجد الإنجليزي فقط: لا شيء (السيدر الجديد سبق الترحيل — بصمة سليمة).
     */
    public function up(): void
    {
        DB::transaction(function () {
            foreach (self::SLUG_MAP as $arabicSlug => $englishSlug) {
                $arabic = DB::table('categories')->where('slug', $arabicSlug)->first();
                $english = DB::table('categories')->where('slug', $englishSlug)->first();

                if ($arabic && $english) {
                    $this->moveReferences($arabic->id, $english->id);
                    DB::table('categories')->where('id', $arabic->id)->delete();
                } elseif ($arabic && ! $english) {
                    DB::table('categories')->where('id', $arabic->id)->update(['slug' => $englishSlug]);
                }
            }
        });
    }

    public function down(): void
    {
        DB::transaction(function () {
            foreach (self::SLUG_MAP as $arabicSlug => $englishSlug) {
                $arabic = DB::table('categories')->where('slug', $arabicSlug)->first();
                $english = DB::table('categories')->where('slug', $englishSlug)->first();

                // إن وُجد الإنجليزي ولم يوجد العربي: أرجِع السلاغ العربي.
                if ($english && ! $arabic) {
                    DB::table('categories')->where('id', $english->id)->update(['slug' => $arabicSlug]);
                }
            }
        });
    }

    /**
     * انقل مراجع الوجهات والفعاليات من فئة إلى أخرى.
     */
    private function moveReferences(int $fromCategoryId, int $toCategoryId): void
    {
        DB::table('listings')
            ->where('category_id', $fromCategoryId)
            ->update(['category_id' => $toCategoryId]);

        DB::table('events')
            ->where('category_id', $fromCategoryId)
            ->update(['category_id' => $toCategoryId]);
    }
};