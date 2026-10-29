import { Form } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

export default function CreatePengajuan({kendaraans}){
    return (
        <section className="py-6 px-4">
            <div className="flex justify-between">
                <h1 className="font-bold text-lg">Buat Pengajuan</h1>
                <Link href="/pengajuans" className="btn btn-warning"><ArrowLeftIcon className="size-4" /> Back</Link>
            </div>
            <Form 
                action="/pengajuans" 
                method="post"
                className="flex gap-4 w-10/12 mx-auto"
            >
                {({
                    errors, 
                    processing
                }) => (
                    <>
                        <div className="flex flex-col gap-4 w-full md:w-8/12 mx-auto">
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Nopol</legend>
                                <select className="select w-full" name="nopol" id="nopol">
                                    {kendaraans.map((kendaraan) => {
                                        return (
                                            <option 
                                                key={kendaraan.id} 
                                                value={kendaraan.nopol}
                                                selected={kendaraan.nopol === "DEFAULT" ? true : false}
                                            >
                                                {kendaraan.nopol}
                                            </option>
                                        )
                                    })}
                                </select>
                                <p className="label text-primary">Note : Pilih <b>DEFAULT</b> jika bukan pengajuan kendaraan</p>
                                {errors.nopol && <span className="text-red-600">{errors.nopol}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Pengajuan</legend>
                                <input type="text" id="pengajuan" name="pengajuan" className="input w-full" placeholder="pengajuan apa" autoComplete="off"/>
                                {errors.pengajuan && <span className="text-red-600">{errors.pengajuan}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Jenis</legend>
                                <select name="jenis" id="jenis" className="select w-full" defaultValue="-">
                                    <option value="-">  ----   Jenis Pengajuan   ----  </option>
                                    <option value="OLI">OLI</option>
                                    <option value="SERVICE">SERVICE</option>
                                    <option value="BAN">BAN</option>
                                    <option value="AKI">AKI</option>
                                    <option value="PAJAK 1 TAHUN">PAJAK 1 TAHUN</option>
                                    <option value="PAJAK 5 TAHUN">PAJAK 5 TAHUN</option>
                                    <option value="KIR">KIR</option>
                                    <option value="APAR">APAR</option>
                                    <option value="PROPERTY">PROPERTY</option>
                                    <option value="ATK">ATK</option>
                                </select>
                                {errors.jenis && <span className="text-red-600">{errors.jenis}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Nominal</legend>
                                <input type="number" id="nominal" name="nominal" className="input w-full" placeholder="00" autoComplete="off"/>
                                {errors.nominal && <span className="text-red-600">{errors.nominal}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Catatan</legend>
                                <input type="text" id="catatan" name="catatan" className="input w-full" placeholder="xxx" autoComplete="off"/>
                                {errors.catatan && <span className="text-red-600">{errors.catatan}</span>}
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Keterangan</legend>
                                <input type="text" id="keterangan" name="keterangan" className="input w-full" placeholder="xxx" autoComplete="off"/>
                                {errors.keterangan && <span className="text-red-600">{errors.keterangan}</span>}
                            </fieldset>
                            <button className="btn btn-primary" type="submit" disabled={processing}>
                                {processing ? "Prosess.." : "Submit" }
                            </button>
                        </div>
                        
                    </>
                )}
            </Form>
        </section>
    )
}