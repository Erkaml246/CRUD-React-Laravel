<?php

use App\Http\Controllers\Api\AlbumController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('album', [AlbumController::class, 'index']);
Route::post('album', [AlbumController::class, 'store']);
Route::get('album/{AlbumID}', [AlbumController::class, 'show']);
Route::get('album/{AlbumID}/edit', [AlbumController::class, 'edit']);
Route::put('album/{AlbumID}', [AlbumController::class, 'update']);
Route::delete('album/{AlbumID}/delete', [AlbumController::class, 'destroy']);



