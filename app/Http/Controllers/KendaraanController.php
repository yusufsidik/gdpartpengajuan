<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kendaraan;
use Inertia\Inertia;

class KendaraanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kendaraans = Kendaraan::select('id','nopol','pic','tahun_pembuatan','no_rangka','no_mesin','pajak_1_tahun','pajak_5_tahun')
            ->paginate(10);

        return Inertia::render('Kendaraan/index', [
            'kendaraans' => $kendaraans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kendaraan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nopol' => ['required'],
            'pic' => ['required','max:128'],
            'merk_type' => ['required','max:128'],
            'tgl_beli_aki' => ['max:128'],
            'jenis_model' => ['max:128'],
            'tahun_pembuatan' => ['required','max:4'],
            'warna' => ['required','max:50'],
            'no_rangka' => ['required','max:50'],
            'no_mesin' => ['required','max:50'],
            'ukuran_ban' => ['max:50'],
            'roda' => ['max:2'], 
            'tanggal_kir' => ['max:128'],
            'pajak_1_tahun' => ['max:128'],
            'pajak_5_tahun' => ['max:128']
        ]);

        Kendaraan::create($validated);

        return redirect('/kendaraans')->with('success','Kendaraan ditambahkan');
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
        $kendaraan = Kendaraan::where('id', $id)->first();
        
        return Inertia::render('Kendaraan/edit', [
            'kendaraan' => $kendaraan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'nopol' => ['required','max:20'],
            'pic' => ['required','max:128'],
            'merk_type' => ['required','max:128'],
            'tgl_beli_aki' => ['max:128'],
            'jenis_model' => ['max:128'],
            'tahun_pembuatan' => ['required','max:4'],
            'warna' => ['required','max:50'],
            'no_rangka' => ['required','max:50'],
            'no_mesin' => ['required','max:50'],
            'ukuran_ban' => ['max:50'],
            'roda' => ['max:2'], 
            'tanggal_kir' => ['max:128'],
            'pajak_1_tahun' => ['max:128'],
            'pajak_5_tahun' => ['max:128']
        ]);

        $kendaraan = Kendaraan::findOrFail($id);
        
        $kendaraan->update($validated);

        return redirect('/kendaraans')->with('success', 'Data '. $request->nopol .'Berhasil di update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kendaraan $kendaraan)
    {
        $kendaraan->delete();
        
        return redirect('/kendaraans')->with('success','Data kendaraan berhasil dihapus');
    }
}
