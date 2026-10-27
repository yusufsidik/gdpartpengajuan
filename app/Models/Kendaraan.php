<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kendaraan extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'nopol',
        'pic',
        'merk_type',
        'tgl_beli_aki',
        'jenis_model',
        'tahun_pembuatan',
        'warna',
        'no_rangka',
        'no_mesin',
        'ukuran_ban',
        'roda',
        'tanggal_kir',
        'pajak_1_tahun',
        'pajak_5_tahun'
    ];

    public function pengajuans(): HasMany {
        return $this->hasMany(Pengajuan::class, 'nopol', 'nopol')->latest('tgl_diajukan');
    }
}
