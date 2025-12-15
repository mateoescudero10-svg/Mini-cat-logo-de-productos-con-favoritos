<?php

use Illuminate\Support\Facades\Route;

// ==========================================================
// RUTA ÚNICA PARA SPA (Single Page Application)
// ==========================================================

// Esta ruta utiliza el middleware 'web', el cual es responsable de:
// 1. Iniciar la sesión de Laravel.
// 2. Generar y adjuntar el token CSRF a la sesión.
// 3. Insertar el token CSRF en la vista a través de {{ csrf_token() }} si se utiliza.

Route::get('/{path?}', function () {
    // Retorna la vista Blade que contiene el código HTML y la carga de React.
    // Asegúrate de que 'welcome' es el nombre de tu archivo Blade principal.
    return view('welcome');
})
// El patrón {path?} captura CUALQUIER URL que no coincida con otra ruta definida.
// Ej: /, /login, /register, /catalogo. Esto permite que React Router maneje el frontend.
->where('path', '.*'); 


// ==========================================================
// CARGAR RUTAS API (Backend RESTful)
// ==========================================================

// El archivo routes/api.php se carga bajo el prefijo 'api'.
// El middleware 'api' se aplicará a todas las rutas dentro de routes/api.php
// (El middleware 'api' no incluye la verificación de CSRF).
Route::prefix('api')
    ->group(base_path('routes/api.php'));