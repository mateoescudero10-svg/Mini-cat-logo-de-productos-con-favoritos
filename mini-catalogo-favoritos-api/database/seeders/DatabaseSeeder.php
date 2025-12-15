<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Usuario admin
        User::create([
            'name' => 'Mateo',
            'email' => 'mateo@ejemplo.com',
            'password' => Hash::make('1234'),
            'is_admin' => true,
        ]);

        // Usuario normal
        User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'is_admin' => false,
        ]);

        // Productos de ejemplo
        Product::create([
            'name' => 'Laptop Gaming',
            'description' => 'Laptop de alta gama para gaming',
            'price' => 1200.00,
            'image_url' => 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Smartphone Pro',
            'description' => 'Teléfono inteligente de última generación',
            'price' => 899.99,
            'image_url' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Auriculares Bluetooth',
            'description' => 'Auriculares inalámbricos con cancelación de ruido',
            'price' => 199.99,
            'image_url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        ]);

        // Productos para mascotas
        Product::create([
            'name' => 'Cama para Perro Grande',
            'description' => 'Cama ortopédica premium para perros grandes, lavable y cómoda',
            'price' => 89.99,
            'image_url' => 'https://images.unsplash.com/photo-1581888227599-779811939961?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Comedero Automático',
            'description' => 'Dispensador automático de comida con temporizador programable',
            'price' => 129.99,
            'image_url' => 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Juguete Interactivo Gato',
            'description' => 'Torre de juegos con plumas y ratones para gatos activos',
            'price' => 45.99,
            'image_url' => 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Correa Retráctil Premium',
            'description' => 'Correa extensible de 5 metros con sistema de freno automático',
            'price' => 34.99,
            'image_url' => 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Arena para Gato',
            'description' => 'Arena premium aglomerante con control de olores, 10kg',
            'price' => 24.99,
            'image_url' => 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'name' => 'Transportadora de Viaje',
            'description' => 'Transportadora resistente y cómoda para mascotas medianas',
            'price' => 79.99,
            'image_url' => 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500&h=500&fit=crop',
        ]);
    }
}