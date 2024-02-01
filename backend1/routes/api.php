<?php

use App\Http\Controllers\Api\AlbumController;
use App\Http\Controllers\Api\FotoController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);

Route::get('album', [AlbumController::class, 'index']);
Route::post('album', [AlbumController::class, 'store']);
Route::get('album/{AlbumID}', [AlbumController::class, 'show']);
Route::get('album/{AlbumID}/edit', [AlbumController::class, 'edit']);
Route::put('album/{AlbumID}', [AlbumController::class, 'update']);
Route::delete('album/{AlbumID}/delete', [AlbumController::class, 'destroy']);

Route::get('foto', [FotoController::class, 'index']);
Route::post('foto', [FotoController::class, 'store']);
Route::get('foto/{FotoID}', [FotoController::class, 'show']);
Route::get('foto/{FotoID}/edit', [FotoController::class, 'edit']);
Route::put('foto/{FotoID}', [FotoController::class, 'update']);
Route::delete('foto/{FotoID}/delete', [FotoController::class, 'destroy']);



