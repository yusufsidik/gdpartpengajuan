<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Apar;
use Illuminate\Support\Facades\DB;

class AparController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rekap = DB::table('apars')
            ->select('kapasitas', DB::raw('COUNT(*) as jumlah_tabung'))
            ->groupBy('kapasitas')
            ->orderBy('kapasitas', 'asc')
            ->get();

        $apars = Apar::all();
        $total_apar = Apar::count();
        return Inertia::render('Apar/index', [
            'apars' => $apars,
            'total_apar' => $total_apar,
            'rekap' => $rekap
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Apar/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'merk' => ['string', 'nullable'],
            'kapasitas' => ['decimal:0,2', 'nullable'],
            'lokasi' => ['string', 'nullable'],
            'starting_date' => ['string', 'nullable'],
            'next_date' => ['date', 'nullable'],
            'type' => ['string', 'nullable']
        ]);

        Apar::create($validated);

        return redirect('/apars')->with('success', 'Berhasil tambah data apar');
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
        $apar = Apar::findOrFail($id);
        
        return Inertia::render('Apar/edit', [
            'apar' => $apar
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'merk' => ['string', 'nullable'],
            'kapasitas' => ['decimal:0,2', 'nullable'],
            'lokasi' => ['string', 'nullable'],
            'starting_date' => ['string', 'nullable'],
            'next_date' => ['date', 'nullable'],
            'type' => ['string', 'nullable']
        ]);

        $apar = Apar::findOrFail($id);

        $apar->update($validated);

        return redirect('/apars')->with('success','Data Apar berhasil di update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $apar = Apar::findOrFail($id);
        $apar->delete();

        return redirect('/apars')->with('success', 'Data Apar berhasil dihapus');
    }
}
