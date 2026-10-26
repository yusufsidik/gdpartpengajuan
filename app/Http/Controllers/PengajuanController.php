<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use Illuminate\Http\Request;
use App\Models\Pengajuan;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Jenis;
use Illuminate\Validation\Rule;

class PengajuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pengajuan::select('id','nomor_pengajuan','nopol','pengajuan','jenis','nominal','tgl_diajukan','status','tgl_acc','keterangan','catatan');
        
        $defaultStart = Carbon::now()->startOfMonth()->startOfDay();
        $defaultEnd = Carbon::now()->endOfDay();
        // $defaultEnd = Carbon::now()->endOfMonth()->endOfDay();
        
        if ($request->filled('search')) {
        
            $query->where('nomor_pengajuan', 'like', '%'.$request->search.'%');
        
        } else {
            
            if ($request->filled('start_date') && $request->filled('end_date')) {

                $start = Carbon::parse($request->start_date)->startOfDay();
                $end = Carbon::parse($request->end_date)->endOfDay();

                // cek apakah tgl awal melebihi 3 bulan dari tgl akhir atau perbedaan jumlah hari dari tgl awal dan akhir lebih dari 92 hari
                if ($start->diffInMonths($end) >= 3 || $end->diffInDays($start) > 92) { // Validasi 2: Jarak tidak boleh lebih dari 3 bulan, Jika user pilih 2026-01-01 sampai 2026-08-01, kita potong jadi 2026-01-01 sampai 2026-03-31
                    $end = $start->copy()->addMonths(3)->subDay()->endOfDay();
                }
                $query->whereBetween('tgl_diajukan', [$start, $end]);
            } else {
                // Default bulan ini
                $query->whereBetween('tgl_diajukan', [
                    $defaultStart, 
                    $defaultEnd, 
                ]);
            }
        }
        $pengajuans = $query->latest('tgl_diajukan')->paginate(10)->withQueryString();

        return Inertia::render('Pengajuan/index', [
            'pengajuans' => $pengajuans,
            'filters' => $request->only(['start_date', 'end_date', 'search']),
            'defaultStart' => $defaultStart->toDateString(),
            'defaultEnd' => $defaultEnd->toDateString()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $kendaraans = Kendaraan::select('id','nopol')->get();
        return Inertia::render('Pengajuan/create', [
            'kendaraans' => $kendaraans
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pengajuan' => ['required', 'max:128'],
            'jenis' => ['required' , Rule::enum(Jenis::class)],
            'nominal' => ['required'],
            'catatan' => ['nullable', 'max:1000'],
            'keterangan' => ['nullable'],
            'nopol' => ['nullable', 'max:75']
        ]);

        // $countToday = Pengajuan::whereDate('created_at', today())->count() + 1;
        
        // $nomor = 'PGJ-' . now()->format('Ymd') . '-' . str_pad($countToday, 4, '0', STR_PAD_LEFT);

        $prefix = 'PGJ-' . now()->format('Ymd') . '-';

        // cek nomorpengajuan terakhir termasuk di trash (deleted_at)
        $lastNumber = Pengajuan::withTrashed()
            ->where('nomor_pengajuan', 'like', $prefix . '%')
            ->orderBy('nomor_pengajuan', 'desc')
            ->value('nomor_pengajuan');

        // jika blm ada nomor pengajuannya, + 1
        if($lastNumber){
            $lastSeq = (int) substr($lastNumber, -4);
            $newSeq = $lastSeq + 1;
        
        // jika sdh ada maka nomor pengajuan 1
        } else {
            $newSeq = 1;
        }

        // gabungkan prefix dengan nomor urut
        $nomor_pengajuan = $prefix . str_pad($newSeq, 4, '0', STR_PAD_LEFT);

        Pengajuan::create([
            'nomor_pengajuan' => $nomor_pengajuan,
            'tgl_diajukan' => now(),
            'tgl_acc' => null,
            ...$validated
        ]);

        return redirect('/pengajuans')->with('success', 'Pengajuan berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pengajuan = Pengajuan::findOrFail($id);
        $pengajuan->delete();

        return back()->with('success','Pengajuan berhasil dihapus');
    }

    public function restore(string $id)
    {
        Pengajuan::withTrashed()->findOrFail($id)->restore();
        return back();
    }

    public function forceDelete(string $id)
    {
        Pengajuan::withTrashed()->findOrFail($id)->forceDelete();
        return back();
    }

    public function status(Request $request, string $id)
    {

        $request->validate([
            'status' => ['required', 'in:APPROVED,REJECTED'],
            'catatan' => ['nullable', 'max:1000'],
            'keterangan' => ['nullable']
        ]);

        $pengajuan = Pengajuan::findOrFail($id);

        $pengajuan->update([
            'status' => $request->status,
            'tgl_acc' => now(),
            'catatan' => $request->catatan
        ]);

        return back()->with('success', "Pengajuan berhasil di approve {$request->status}");
    }
}
