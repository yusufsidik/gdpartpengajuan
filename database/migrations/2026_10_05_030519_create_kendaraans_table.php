<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kendaraans', function (Blueprint $table) {
            $table->id();
            $table->string('nopol')->unique();
            $table->string('pic', 128);
            $table->string('merk_type', 128);
            $table->timestamp('tgl_beli_aki')->nullable();
            $table->string('jenis_model', 128);
            $table->integer('tahun_pembuatan');
            $table->string('warna', 50);
            $table->string('no_rangka', 50);
            $table->string('no_mesin', 50);
            $table->string('ukuran_ban', 50)->nullable();
            $table->integer('roda')->default(4)->nullable();    
            $table->timestamp('tanggal_kir')->nullable();
            $table->timestamp('pajak_1_tahun')->nullable();
            $table->timestamp('pajak_5_tahun')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kendaraans');
    }
};
