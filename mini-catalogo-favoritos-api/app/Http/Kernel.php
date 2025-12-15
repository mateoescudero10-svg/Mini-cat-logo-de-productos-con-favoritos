// app/Http/Kernel.php

protected $middlewareGroups = [
    // ... (dejar 'web' como está)

    'api' => [
        // 🔥 ELIMINAR ESTA LÍNEA DEL GRUPO 'api'
        // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, 
        
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
    
    // Y ELIMINAR CUALQUIER OTRO GRUPO COMO 'api.public' que hayamos creado
];