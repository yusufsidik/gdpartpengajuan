<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{KendaraanController, PengajuanController};

Route::inertia('/','Home');
Route::inertia('/about', 'About');

Route::resource('kendaraans', KendaraanController::class);
Route::get('/kendaraans/{id}/pengajuans', [KendaraanController::class, 'pengajuan'])->name('kendaraan.pengajuan');
Route::resource('pengajuans', PengajuanController::class);
Route::put('/pengajuans/{id}/restore', [PengajuanController::class, 'restore']);
Route::delete('/pengajuans/{id}/force', [PengajuanController::class, 'forceDelete']);
Route::put('/pengajuans/{id}/status', [PengajuanController::class ,'status'])->name('pengajuans.status');