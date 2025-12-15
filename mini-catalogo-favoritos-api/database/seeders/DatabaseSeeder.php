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
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
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
            'image_url' => 'https://res.cloudinary.com/dxhg51y8w/image/upload/v123/sample.jpg',
        ]);

        Product::create([
            'name' => 'Smartphone Pro',
            'description' => 'Teléfono inteligente de última generación',
            'price' => 899.99,
            'image_url' => 'https://res.cloudinary.com/dxhg51y8w/image/upload/v123/sample2.jpg',
        ]);

        Product::create([
            'name' => 'Auriculares Bluetooth',
            'description' => 'Auriculares inalámbricos con cancelación de ruido',
            'price' => 199.99,
            'image_url' => 'https://res.cloudinary.com/dxhg51y8w/image/upload/v123/sample3.jpg',
        ]);
    }
}