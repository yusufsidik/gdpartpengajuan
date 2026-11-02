<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apar extends Model
{
    protected $fillable = ['merk','kapasitas','lokasi','starting_date','next_date','type'];
}
