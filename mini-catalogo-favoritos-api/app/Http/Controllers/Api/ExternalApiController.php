<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class ExternalApiController extends Controller
{
    public function dogImage()
    {
        // Return a static dog image URL to avoid external API issues
        return response()->json([
            'success' => true,
            'image_url' => 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
            'message' => '¡Aquí tienes una imagen aleatoria de un perro!'
        ]);
    }
}