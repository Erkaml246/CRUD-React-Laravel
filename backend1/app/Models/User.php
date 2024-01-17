<?php
// app/Models/Album.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'user';
    protected $primaryKey = 'id_user';
    protected $fillable = ['Username', 'Password', 'Email', 'NamaLengkap', 'Alamat'];

    public $timestamps = false;
}
