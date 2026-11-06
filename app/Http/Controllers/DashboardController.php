<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\{Apar, Pengajuan};
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $date_now = Carbon::now()->endOfDay();

        // pengajuan
        $start_date = Carbon::now()->startOfMonth()->startOfDay();
        $end_date = $date_now;

        $stats_pengajuan = Pengajuan::selectRaw("
                COUNT(*) AS total,
                SUM(CASE WHEN status = 'WAITING' THEN 1 ELSE 0 END) AS waiting
            ")
            ->whereBetween('tgl_diajukan', [$start_date, $end_date])
            ->first();
        
        $jumlah_waiting_bulan_ini = $stats_pengajuan->waiting;
        $jumlah_pengajuan_bulan_ini = $stats_pengajuan->total;

        $list_pengajuan_waiting = DB::table('pengajuans')
            ->select('nomor_pengajuan')
            ->whereBetween('tgl_diajukan', [$start_date, $end_date])
            ->where('status', 'WAITING')
            ->get();

        // kendaraan
        $jumlah_kendaraan = DB::table('kendaraans')
            ->count();
        
        $jumlah_per_jenis_kendaraan = DB::table('kendaraans')
            ->select('jenis_model', DB::raw('COUNT(*) as jumlah'))
            ->where('deleted_at', null)
            ->groupBy('jenis_model')
            ->get();

        $list_kendaraan_tenggang_pajak = DB::table('kendaraans')
            ->select('nopol','pajak_1_tahun', 'pajak_5_tahun')
            ->where('pajak_1_tahun', '<=', $date_now)
            ->orWhere('pajak_5_tahun', '<=', $date_now)
            ->get();

        // apar
        $list_jumlah_tabung_apar = DB::table('apars')
            ->select('kapasitas', DB::raw('COUNT(*) as jumlah_tabung'))
            ->groupBy('kapasitas')
            ->orderBy('kapasitas', 'ASC')
            ->get();

        $total_tabung = DB::table('apars')->count();

        return Inertia::render('Dashboard/index', [
            'jumlah_waiting_bulan_ini' => $jumlah_waiting_bulan_ini,
            'jumlah_pengajuan_bulan_ini' => $jumlah_pengajuan_bulan_ini,
            'list_pengajuan_waiting' => $list_pengajuan_waiting,
            'jumlah_kendaraan' => $jumlah_kendaraan,
            'jumlah_per_jenis_kendaraan' => $jumlah_per_jenis_kendaraan,
            'list_kendaraan_tenggang_pajak' => $list_kendaraan_tenggang_pajak,
            'list_jumlah_tabung_apar' => $list_jumlah_tabung_apar,
            'total_tabung' => $total_tabung
        ]);
    }
}
