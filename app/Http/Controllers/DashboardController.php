<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\{Apar,Pengajuan};
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $start_date = Carbon::now()->startOfMonth()->startOfDay();
        $end_date = Carbon::now()->endOfDay();
        $jumlah_waiting_bulan_ini = DB::table('pengajuans')
            ->select('status', DB::raw('COUNT(*) as jumlah'))
            ->whereBetween('tgl_diajukan', [$start_date, $end_date])
            ->where('status', 'WAITING')
            ->groupBy('status')
            ->first();
        
        $list_pengajuan_waiting = DB::table('pengajuans')
            ->select('nomor_pengajuan')
            ->whereBetween('tgl_diajukan', [$start_date, $end_date])
            ->where('status', 'WAITING')
            ->get();

        $jumlah_pengajuan_bulan_ini = Pengajuan::whereBetween('tgl_diajukan', [$start_date, $end_date])->count();

        return Inertia::render('Dashboard/index', [
            'jumlah_waiting_bulan_ini' => $jumlah_waiting_bulan_ini,
            'jumlah_pengajuan_bulan_ini' => $jumlah_pengajuan_bulan_ini,
            'list_pengajuan_waiting' => $list_pengajuan_waiting
        ]);
    }
}
