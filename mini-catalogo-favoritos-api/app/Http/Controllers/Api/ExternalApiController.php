<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class ExternalApiController extends Controller
{
    public function dogImage()
    {
        try {
            // Llamar a la API externa de Dog CEO sin verificación SSL (para desarrollo)
            $response = Http::withoutVerifying()
                ->timeout(10)
                ->get('https://dog.ceo/api/breeds/image/random');
            
            if ($response->successful()) {
                $data = $response->json();
                
                if (isset($data['status']) && $data['status'] === 'success' && isset($data['message'])) {
                    return response()->json([
                        'success' => true,
                        'image_url' => $data['message'],
                        'message' => '¡Aquí tienes una imagen aleatoria de un perro!'
                    ]);
                }
            }
            
            // Si falla, devolver una imagen por defecto
            return response()->json([
                'success' => false,
                'message' => 'No se pudo obtener la imagen del perro'
            ], 500);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al conectar con la API externa: ' . $e->getMessage()
            ], 500);
        }
    }
}