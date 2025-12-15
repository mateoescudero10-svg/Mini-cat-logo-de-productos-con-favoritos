<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($productId)
    {
        $comments = Comment::with('user')
            ->where('product_id', $productId)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'content' => 'required|string|max:200',
        ]);

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id,
            'content' => $request->content,
        ]);

        $comment->load('user');

        return response()->json($comment, 201);
    }
}