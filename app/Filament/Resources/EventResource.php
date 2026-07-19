<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $modelLabel = 'فعالية';

    protected static ?string $pluralModelLabel = 'الفعاليات';

    protected static ?string $navigationGroup = 'المحتوى';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('معلومات أساسية')
                    ->schema([
                        Forms\Components\TextInput::make('title_ar')
                            ->label('اسم الفعالية (عربي)')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', str()->slug($state))),
                        Forms\Components\TextInput::make('title_en')
                            ->label('اسم الفعالية (إنجليزي)')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->label('الرابط')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\RichEditor::make('description_ar')
                            ->label('الوصف (عربي)')
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('description_en')
                            ->label('الوصف (إنجليزي)')
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('التفاصيل')
                    ->schema([
                        Forms\Components\DateTimePicker::make('start_date')
                            ->label('تاريخ البداية')
                            ->native(false)
                            ->displayFormat('d/m/Y h:i A'),
                        Forms\Components\DateTimePicker::make('end_date')
                            ->label('تاريخ النهاية')
                            ->native(false)
                            ->displayFormat('d/m/Y h:i A'),
                        Forms\Components\TextInput::make('location_name')
                            ->label('اسم الموقع')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('location_map')
                            ->label('رابط الخريطة')
                            ->url()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('price')
                            ->label('السعر')
                            ->maxLength(255)
                            ->placeholder('مجاناً — حضور'),
                        Forms\Components\TextInput::make('external_url')
                            ->label('رابط التسجيل الخارجي')
                            ->url()
                            ->maxLength(255),
                    ])->columns(3),

                Forms\Components\Section::make('تصنيف')
                    ->schema([
                        Forms\Components\Select::make('category_id')
                            ->label('التصنيف')
                            ->relationship('category', 'name_ar')
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name_ar')->label('الاسم')->required(),
                                Forms\Components\TextInput::make('slug')->label('الرابط')->required(),
                                Forms\Components\Select::make('type')->label('النوع')->options(['tag' => 'وسم', 'category' => 'قسم'])->default('tag'),
                            ]),
                        Forms\Components\Select::make('country_id')
                            ->label('المدينة')
                            ->relationship('country', 'name_ar')
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name_ar')->label('الاسم')->required(),
                                Forms\Components\TextInput::make('slug')->label('الرابط')->required(),
                            ]),
                    ])->columns(2),

                Forms\Components\Section::make('حالة النشر')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->label('الحالة')
                            ->required()
                            ->options([
                                'draft' => 'مسودة',
                                'published' => 'منشور',
                                'archived' => 'مؤرشف',
                            ])
                            ->default('draft'),
                        Forms\Components\Toggle::make('featured')
                            ->label('مميزة')
                            ->default(false),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title_ar')
                    ->label('الفعالية')
                    ->searchable()
                    ->sortable()
                    ->description(fn (Event $record): string => $record->location_name ?? ''),
                Tables\Columns\TextColumn::make('category.name_ar')
                    ->label('التصنيف')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('country.name_ar')
                    ->label('المدينة')
                    ->sortable(),
                Tables\Columns\TextColumn::make('start_date')
                    ->label('التاريخ')
                    ->date('d/m/Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->label('الحالة')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'draft' => 'مسودة',
                        'published' => 'منشور',
                        'archived' => 'مؤرشف',
                        default => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'published' => 'success',
                        'archived' => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\IconColumn::make('featured')
                    ->label('مميز')
                    ->boolean(),
                Tables\Columns\TextColumn::make('favorites_count')
                    ->label('المفضلة')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('الحالة')
                    ->options([
                        'draft' => 'مسودة',
                        'published' => 'منشور',
                        'archived' => 'مؤرشف',
                    ]),
                Tables\Filters\SelectFilter::make('category')
                    ->label('التصنيف')
                    ->relationship('category', 'name_ar'),
                Tables\Filters\SelectFilter::make('country')
                    ->label('المدينة')
                    ->relationship('country', 'name_ar'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('تعديل'),
                Tables\Actions\DeleteAction::make()->label('حذف'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()->label('حذف المحدد'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
