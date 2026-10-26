import { Form } from "@inertiajs/react";

export default function Edit({kendaraan}){
    return (
        <>
            <section className="py-6 px-4">
            <h1 className="font-bold text-lg">Edit Kendaraan</h1>
            <Form 
                action={`/kendaraans/${kendaraan.id}`} 
                method="put"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-10/12 mx-auto"
            >
                {({
                    errors, 
                    processing
                }) => (
                    <>
                        <div className="flex flex-col gap-4 w-full">
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Nopol</legend>
                                <input type="text" id="nopol" name="nopol" className="input w-full" placeholder="XX XXXX XX" autoComplete="off" defaultValue={kendaraan.nopol}/>
                                {errors.nopol && <span className="text-red-600">{errors.nopol}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">PIC</legend>
                                <input type="text" id="pic" name="pic" className="input w-full" placeholder="Anang Hermansyah" autoComplete="off" defaultValue={kendaraan.pic}/>
                                {errors.pic && <span className="text-red-600">{errors.pic}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Merk/Type</legend>
                                <input type="text" id="merk_type" name="merk_type" className="input w-full" placeholder="Yamaha" autoComplete="off" defaultValue={kendaraan.merk_type}/>
                                {errors.merk_type && <span className="text-red-600">{errors.merk_type}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Tanggal Beli AKI</legend>
                                <input type="date" id="tgl_beli_aki" name="tgl_beli_aki" className="input w-full" placeholder="xx xx xxx" autoComplete="off" defaultValue={kendaraan.tgl_beli_aki ? kendaraan.tgl_beli_aki.substring(0,10) : null}/>
                                {errors.tgl_beli_aki && <span className="text-red-600">{errors.tgl_beli_aki}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Jenis/Model</legend>
                                <input type="text" id="jenis_model" name="jenis_model" className="input w-full" placeholder="SEPEDA MOTOR / MOBIL" autoComplete="off" defaultValue={kendaraan.jenis_model}/>
                                {errors.jenis_model && <span className="text-red-600">{errors.jenis_model}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Tahun Pembuatan</legend>
                                <input type="number" id="tahun_pembuatan" name="tahun_pembuatan" className="input w-full" placeholder="xxxx" autoComplete="off" defaultValue={kendaraan.tahun_pembuatan}/>
                                {errors.tahun_pembuatan && <span className="text-red-600">{errors.tahun_pembuatan}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Warna</legend>
                                <input type="text" id="warna" name="warna" className="input w-full" placeholder="HITAM" autoComplete="off" defaultValue={kendaraan.warna}/>
                                {errors.warna && <span className="text-red-600">{errors.warna}</span>}
                            </fieldset>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">No. Rangka</legend>
                                <input type="text" id="no_rangka" name="no_rangka" className="input w-full" placeholder="xxxx" autoComplete="off" defaultValue={kendaraan.no_rangka}/>
                                {errors.no_rangka && <span className="text-red-600">{errors.no_rangka}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">No. Mesin</legend>
                                <input type="text" id="no_mesin" name="no_mesin" className="input w-full" placeholder="xxxx" autoComplete="off" defaultValue={kendaraan.no_mesin}/>
                                {errors.no_mesin && <span className="text-red-600">{errors.no_mesin}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Ukuran Ban</legend>
                                <input type="text" id="ukuran_ban" name="ukuran_ban" className="input w-full" placeholder="Ring 17" autoComplete="off" defaultValue={kendaraan.ukuran_ban}/>
                                {errors.ukuran_ban && <span className="text-red-600">{errors.ukuran_ban}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Roda</legend>
                                <input type="text" id="roda" name="roda" className="input w-full" placeholder="4" autoComplete="off" defaultValue={kendaraan.roda}/>
                                {errors.roda && <span className="text-red-600">{errors.roda}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Tanggal KIR</legend>
                                <input type="date" id="tgl_kir" name="tgl_kir" className="input w-full" placeholder="xx xx xxx" autoComplete="off" defaultValue={kendaraan.tgl_kir ? kendaraan.tgl_kir.substring(0,10) : null} />
                                {errors.tgl_kir && <span className="text-red-600">{errors.tgl_kir}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Pajak 1 Tahun</legend>
                                <input type="date" id="pajak_1_tahun" name="pajak_1_tahun" className="input w-full" placeholder="xx xx xxx" autoComplete="off" defaultValue={kendaraan.pajak_1_tahun ? kendaraan.pajak_1_tahun.substring(0,10) : null}/>
                                {errors.pajak_1_tahun && <span className="text-red-600">{errors.pajak_1_tahun}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Pajak 5 Tahun</legend>
                                <input type="date" id="pajak_5_tahun" name="pajak_5_tahun" className="input w-full" placeholder="xx xx xxx" autoComplete="off" defaultValue={kendaraan.pajak_5_tahun ? kendaraan.pajak_5_tahun.substring(0,10) : null}/>
                                {errors.pajak_5_tahun && <span className="text-red-600">{errors.pajak_5_tahun}</span>}
                            </fieldset>
                        </div>
                        <button className="btn btn-primary col-span-2" type="submit" disabled={processing}>
                            {processing ? "Menyimpan..." : "Update" }
                        </button>
                    </>
                )}
            </Form>
        </section>
        </>
    )
}