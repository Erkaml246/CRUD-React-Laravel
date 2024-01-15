<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Album; // Perlu mengimport model Album
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlbumController extends Controller
{
    public function index()
    {
        $albums = Album::all();
        if ($albums->count() > 0) {
            return response()->json([
                'status' => 200,
                'albums' => $albums // Menggunakan variable $albums bukan $album
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No records found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'NamaAlbum' => 'required|string|max:191',
            'Deskripsi' => 'required|string|max:191',
            'TanggalDibuat' => 'required|date',
            'id_user' => 'required|string|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        } else {
            $album = Album::create([
                'NamaAlbum' => $request->input('NamaAlbum'),
                'Deskripsi' => $request->input('Deskripsi'),
                'TanggalDibuat' => $request->input('TanggalDibuat'),
                'id_user' => $request->input('id_user'),
            ]);

            if ($album) {
                return response()->json([
                    'status' => 201, // Ubah status ke 201 (Created)
                    'message' => 'Data telah ditambahkan',
                    'album' => $album, // Sertakan data album yang baru ditambahkan
                ], 201);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Data gagal ditambahkan'
                ], 500);
            }
        }
    }

    public function show($AlbumID)
    {
        $album = Album::find($AlbumID);

        if ($album) {
            return response()->json([
                'status' => 200,
                'album' => $album,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Data Tidak Ditemukan',
            ], 404);
        }
    }

    public function edit($AlbumID)
    {
        $album = Album::find($AlbumID);

        if ($album) {
            return response()->json([
                'status' => 200,
                'album' => $album,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Data Tidak Ditemukan',
            ], 404);
        }
    }

    public function update(Request $request, int $AlbumID)
    {
        $validator = Validator::make($request->all(), [
            'NamaAlbum' => 'required|string|max:191',
            'Deskripsi' => 'required|string|max:191',
            'TanggalDibuat' => 'required|date',
            'id_user' => 'required|string|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        } else {

            $album = Album::find($AlbumID);

            if ($album) {
                $album->update([
                    'NamaAlbum' => $request->input('NamaAlbum'),
                    'Deskripsi' => $request->input('Deskripsi'),
                    'TanggalDibuat' => $request->input('TanggalDibuat'),
                    'id_user' => $request->input('id_user'),
                ]);
                return response()->json([
                    'status' => 201, // Ubah status ke 201 (Created)
                    'message' => 'Data telah diedit',
                    'album' => $album, // Sertakan data album yang baru ditambahkan
                ], 201);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Data tidak ditemukan'
                ], 404);
            }
        }
    }

    public function destroy($AlbumID)
    {
        $album = Album::find($AlbumID);

        if ($album) {
            $album->delete();
        }else {
            return response()->json([
                'status' => 404,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
    }
}



