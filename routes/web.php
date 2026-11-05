<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{KendaraanController, PengajuanController, AparController, DashboardController};

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// route kendaraan
Route::resource('kendaraans', KendaraanController::class);
Route::get('/kendaraans/{id}/pengajuans', [KendaraanController::class, 'pengajuan'])->name('kendaraan.pengajuan');

// route pengajuan
Route::resource('pengajuans', PengajuanController::class);
Route::put('/pengajuans/{id}/restore', [PengajuanController::class, 'restore']);
Route::delete('/pengajuans/{id}/force', [PengajuanController::class, 'forceDelete']);
Route::put('/pengajuans/{id}/status', [PengajuanController::class ,'status'])->name('pengajuans.status');

// route apar
Route::resource('apars', AparController::class);