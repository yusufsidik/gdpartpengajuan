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
        Schema::create('air_conditioners', function (Blueprint $table) {
            $table->id();
            $table->string('merk', 100);
            $table->string('location', 150);
            $table->string('pk', 10);
            $table->timestamp('previous_services_date')->nullable();
            $table->timestamp('next_services_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('air_conditioners');
    }
};
