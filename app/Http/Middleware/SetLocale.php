<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        if (str_starts_with($request->path(), 'admin')) {
            app()->setLocale('ar');
        }

        return $next($request);
    }
}
