<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favorites = $request->user()->favorites()->with('product')->get();
        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $favorite = Favorite::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id,
        ]);

        return response()->json($favorite, 201);
    }

    public function destroy(Request $request, $productId)
    {
        $favorite = Favorite::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->firstOrFail();

        $favorite->delete();

        return response()->json(['message' => 'Producto eliminado de favoritos']);
    }
}