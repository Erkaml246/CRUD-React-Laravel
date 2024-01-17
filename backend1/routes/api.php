<?php

use App\Http\Controllers\Api\AlbumController;
use App\Http\Controllers\Api\UserController;
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

Route::get('user', [UserController::class, 'index']);
Route::post('user', [UserController::class, 'store']);
Route::get('user/{id_user}', [UserController::class, 'show']);
Route::get('user/{id_user}/edit', [UserController::class, 'edit']);
Route::put('user/{id_user}', [UserController::class, 'update']);
Route::delete('user/{id_user}/delete', [UserController::class, 'destroy']);



