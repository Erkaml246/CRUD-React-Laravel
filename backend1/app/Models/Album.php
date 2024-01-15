<?php
// app/Models/Album.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $table = 'album';
    protected $primaryKey = 'AlbumID';
    protected $fillable = ['NamaAlbum', 'Deskripsi', 'TanggalDibuat', 'id_user'];

    public $timestamps = false;
}
