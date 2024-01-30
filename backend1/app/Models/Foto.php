<?php
// app/Models/Album.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foto extends Model
{
    use HasFactory;

    protected $table = 'foto';
    protected $primaryKey = 'FotoID';
    protected $fillable = ['JudulFoto', 'DeskripsiFoto', 'TanggalUnggah', 'LokasiFile', 'AlbumID', 'id_user'];

    public $timestamps = false;
}
