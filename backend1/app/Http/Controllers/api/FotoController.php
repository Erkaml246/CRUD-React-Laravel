<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Foto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Import the Log facade
use Illuminate\Support\Facades\Validator;

class FotoController extends Controller
{
    public function index()
    {
        $foto = Foto::all();

        if ($foto->count() > 0) {
            return response()->json([
                'status' => 200,
                'foto' => $foto
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
        try {
             // Validate the request
            $validator = Validator::make($request->all(), [
                
                'JudulFoto' => 'required|string|max:191',
                'DeskripsiFoto' => 'required|string|max:191',
                'TanggalUnggah' => 'required|date',
                'LokasiFile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'AlbumID' => 'required|integer',
                'id_user' => 'required|integer',
            ]);

            // Check if validation fails
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors()
                ], 422);
            }

            // Save uploaded file
            $file = $request->file('LokasiFile');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $tujuan_upload = public_path('upload');
            $file->move($tujuan_upload, $fileName);

            // Create a new Foto instance
            $foto = new Foto([
                'JudulFoto' => $request->input('JudulFoto'),
                'DeskripsiFoto' => $request->input('DeskripsiFoto'),
                'TanggalUnggah' => $request->input('TanggalUnggah'),
                'LokasiFile' => "upload/$fileName", // Ganti "images" dengan "upload"
                'AlbumID' => $request->input('AlbumID'),
                'id_user' => $request->input('id_user'),
            ]);

            // Save the photo to the database
            $foto->save();

            return response()->json([
                'status' => 201,
                'message' => 'Foto berhasil diupload dan data berhasil disimpan.',
                'photo' => $foto,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error uploading file and storing data: ' . $e->getMessage());
            return response()->json([
                'status' => 500,
                'message' => 'Terjadi kesalahan saat mengunggah file dan menyimpan data.',
            ], 500);
        }
    }
    public function edit($FotoID)
    {
        $foto = Foto::find($FotoID);

        if ($foto) {
            return response()->json([
                'status' => 200,
                'foto' => $foto,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Data Tidak Ditemukan',
            ], 404);
        }
    }

    public function update(Request $request, int $FotoID)
    {
    $validator = Validator::make($request->all(), [
        'JudulFoto' => 'required|string|max:191',
        'DeskripsiFoto' => 'required|string|max:191',
        'TanggalUnggah' => 'required|date',
        'LokasiFile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'AlbumID' => 'required|string|max:191',
        'id_user' => 'required|string|max:191',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'errors' => $validator->errors()
        ], 422);
    } else {
        $foto = Foto::find($FotoID);

        if ($foto) {
            $foto->update([
                'JudulFoto' => $request->input('JudulFoto'),
                'DeskripsiFoto' => $request->input('DeskripsiFoto'),
                'TanggalUnggah' => $request->input('TanggalUnggah'),
                'LokasiFile' => $request->input('LokasiFile'),
                'AlbumID' => $request->input('AlbumID'),
                'id_user' => $request->input('id_user'),

            ]);
            return response()->json([
                'status' => 201,
                'message' => 'Data telah diedit',
                'foto' => $foto,
            ], 201);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
    }
    }

    public function destroy($FotoID)
    {
        $foto = Foto::find($FotoID);

        if ($foto) {
            $foto->delete();
        }else {
            return response()->json([
                'status' => 404,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
    }
}



