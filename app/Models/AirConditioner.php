<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AirConditioner extends Model
{
    protected $fillable = ['merk','location','pk','previous_services_date','next_services_date'];
}
