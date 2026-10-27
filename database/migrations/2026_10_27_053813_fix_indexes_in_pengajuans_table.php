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
        Schema::table('pengajuans', function (Blueprint $table) {
            $table->index('nopol');
            $table->dropUnique(['nomor_pengajuan']);
            $table->unique(['nomor_pengajuan','deleted_at']);
            $table->index('tgl_diajukan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengajuans', function (Blueprint $table) {
            $table->dropIndex(['nopol']);
            $table->dropIndex(['tgl_diajukan']);
            $table->dropUnique(['nomor_pengajuan', 'deleted_at']);
            $table->unique('nomor_pengajuan');
        });
    }
};
