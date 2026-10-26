<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pengajuan extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'nomor_pengajuan',
        'nopol',
        'pengajuan',
        'jenis',
        'nominal',
        'tgl_diajukan',
        'status',
        'catatan',
        'keterangan',
        'tgl_acc'
    ];


    public function kendaraan(): BelongsTo 
    {
        return $this->belongsTo(Kendaraan::class, 'nopol', '');
    }
}
