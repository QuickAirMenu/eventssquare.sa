<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', fn () => response()->json(['success' => true]));

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', fn () => response()->json([
            'success' => true,
            'data' => request()->user(),
        ]));
    });
});
