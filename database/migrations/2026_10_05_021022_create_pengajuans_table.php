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
        Schema::create('pengajuans', function (Blueprint $table) {
            $table->id();
            $table->string('nopol', 75)->nullable();
            $table->string('pengajuan', 128);
            $table->enum('jenis', ['OLI','SERVICE','BAN','AKI','PAJAK 1 TAHUN','PAJAK 5 TAHUN','KIR','APAR','PROPERTY','IT']);
            $table->decimal('nominal', total: 15, places: 2);
            $table->timestamp('tgl_diajukan')->nullable();
            $table->enum('status', ['WAITING','APPROVED','REJECTED'])->default('WAITING');
            $table->mediumText('catatan')->nullable();
            $table->mediumText('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuans');
    }
};
