<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User; // Perlu mengimport model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        try {
            //validate
            $ValidateUser = Validator::make($request->all(),
            [
                'Username' => 'required',
                'Password' => 'required',
                'Email' => 'required|email|unique:user,Email',
                'NamaLengkap' => 'required',
                'Alamat' => 'required',
            ]);
            if ($ValidateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' =>'validation error',
                    'errors' =>$ValidateUser -> errors()
                ], 401);
            }

            $user = User::create([
                'Username' => $request->Username,
                'Password' => Hash::make($request->password),
                'Email' => $request->Email,
                'NamaLengkap' => $request->NamaLengkap,
                'Alamat' => $request->Alamat,
            ]);

            return response()-> json([
                'status' => true,
                'message' => 'User ditambahkan',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th -> getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $user = User::all();
        if ($user->count() > 0) {
            return response()->json([
                'status' => 200,
                'user' => $user // Menggunakan variable $user bukan $user
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
            'Username' => 'required|string|max:191',
            'Password' => 'required|string|max:191',
            'Email' => 'required|string|max:191',
            'NamaLengkap' => 'required|string|max:191',
            'Alamat' => 'required|string|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        } else {
            $user = User::create([
                'Username' => $request->input('Username'),
                'Password' => $request->input('Password'),
                'Email' => $request->input('Email'),
                'NamaLengkap' => $request->input('NamaLengkap'),
                'Alamat' => $request->input('Alamat'),
            ]);

            if ($user) {
                return response()->json([
                    'status' => 201, // Ubah status ke 201 (Created)
                    'message' => 'Data telah ditambahkan',
                    'user' => $user, // Sertakan data User yang baru ditambahkan
                ], 201);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Data gagal ditambahkan'
                ], 500);
            }
        }
    }

    public function show($id_user)
    {
        $user = User::find($id_user);

        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Data Tidak Ditemukan',
            ], 404);
        }
    }

    public function edit($id_user)
    {
        $user = User::find($id_user);

        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Data Tidak Ditemukan',
            ], 404);
        }
    }

    public function update(Request $request, int $id_user)
    {
    $validator = Validator::make($request->all(), [
        'Username' => 'required|string|max:191',
        'Password' => 'required|string|max:191',
        'Email' => 'required|string|max:191',
        'NamaLengkap' => 'required|string|max:191',
        'Alamat' => 'required|string|max:191',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'errors' => $validator->errors()
        ], 422);
    } else {
        $user = User::find($id_user);

        if ($user) {
            $user->update([
                'Username' => $request->input('Username'),
                'Password' => $request->input('Password'),
                'Email' => $request->input('Email'),
                'NamaLengkap' => $request->input('NamaLengkap'),
                'Alamat' => $request->input('Alamat')
            ]);
            return response()->json([
                'status' => 201,
                'message' => 'Data telah diedit',
                'user' => $user,
            ], 201);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
    }
    }

    public function destroy($id_user)
    {
        $user = User::find($id_user);

        if ($user) {
            $user->delete();
        }else {
            return response()->json([
                'status' => 404,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
    }
}



