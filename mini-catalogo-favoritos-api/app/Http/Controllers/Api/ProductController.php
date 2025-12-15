<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with(['comments.user'])->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'nullable|numeric|min:0',
            'image' => 'required|image|max:2048',
        ]);

        // Subir imagen a Cloudinary
        $uploadedFile = Cloudinary::upload($request->file('image')->getRealPath(), [
            'folder' => 'catalog/products'
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $uploadedFile->getSecurePath(),
        ]);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'description', 'price']);

        if ($request->hasFile('image')) {
            // Subir nueva imagen a Cloudinary
            $uploadedFile = Cloudinary::upload($request->file('image')->getRealPath(), [
                'folder' => 'catalog/products'
            ]);
            $data['image_url'] = $uploadedFile->getSecurePath();
        }

        $product->update($data);

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Producto eliminado']);
    }
}