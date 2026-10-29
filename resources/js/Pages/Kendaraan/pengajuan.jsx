import { Link, router } from "@inertiajs/react"
import { status as statusFn, jenis as jenisFn } from "../../utils/status";
import { rupiah } from "../../utils/rupiah";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";


export default function Pengajuan({kendaraan, pengajuans, filters}){
    const [search, setSearch] = useState(filters.search || '')
    const applyFilter = (key, value) => {
        router.get(`/kendaraans/${kendaraan.id}/pengajuans`,
            {...filters, [key]: value},
            { preserveState: true, preserveScroll: true, replace: true }
        )
    }

    const onClickSearch = (e) => applyFilter('search', search)

    return (
        <section className="py-6 px-4">
            <div className="flex justify-between items-center">
                <table>
                    <thead className="text-center">
                        <tr>
                            <th>Kendaraan</th>
                            <th className="w-24"> : </th>
                            <td>{kendaraan.nopol}</td>
                        </tr>
                        <tr>
                            <th>PIC</th>
                            <th className="w-24"> : </th>
                            <td>{kendaraan.pic}</td>
                        </tr>
                    </thead>
                </table>
                <h3 className="font-semibold text-center">Data Pengajuan Kendaraan</h3>
                <Link href="/kendaraans" className="btn btn-warning"><ArrowLeftIcon className="size-4" /> Back</Link>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between items-center">
                <div className="grow-1">
                    <h3 className="text-xs mb-2 font-semibold">Cari nama pengajuan</h3>
                    <div className="flex gap-2 items-center">
                        <input 
                            type="text" 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Cari nama pengajuan"
                            className="input input-bordered grow"
                        />
                        <button className="btn btn-sm btn-primary" onClick={(e) => onClickSearch(e)}>Cari</button>
                        <button type="reset" 
                            onClick={() => {
                                setSearch('')
                                applyFilter('search', '')
                            }} 
                            className="btn btn-sm btn-warning"
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grow-1">
                    <h4 className="text-xs mb-2 font-semibold">Filter jenis pengajuan</h4>
                    <select
                        value={filters.jenis || ''}
                        onChange={e => applyFilter('jenis', e.target.value)}
                        className="select w-full"
                    >
                        <option value="">---SEMUA JENIS---</option>
                        <option value="OLI">OLI</option>
                        <option value="SERVICE">SERVICE</option>
                        <option value="BAN">BAN</option>
                        <option value="AKI">AKI</option>
                        <option value="PAJAK 1 TAHUN">PAJAK 1 TAHUN</option>
                        <option value="PAJAK 5 TAHUN">PAJAK 5 TAHUN</option>
                        <option value="KIR">KIR</option>
                        <option value="APAR">APAR</option>
                        <option value="PROPERTY">PROPERTY</option>
                        <option value="IT">IT</option>
                        <option value="ATK">ATK</option>
                    </select>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grow-1">
                    <h4 className="text-xs mb-2 font-semibold">Filter status pengajuan</h4>
                    <select
                        value={filters.status || ''}
                        onChange={e => applyFilter('status', e.target.value)}
                        className="select w-full"
                    >
                        <option value="">---SEMUA STATUS---</option>
                        <option value="WAITING">WAITING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                </div>
            </div>
            <div className="divider"></div>
            {/* data pengajuan */}
            <table className="table mx-auto mt-8">
                <thead>
                    <tr>
                        <th>Nomor Pengajuan</th>
                        <th>Pengajuan</th>
                        <th>Jenis</th>
                        <th>Nominal</th>
                        <th>Status</th>
                        <th>Tgl Diajukan</th>
                        <th>Catatan</th>
                    </tr>
                </thead>
                <tbody>
                    {pengajuans?.data.map((pengajuan, index) => {
                        return (
                            <tr key={index+1} className="hover:bg-base-300">
                                <td>{pengajuan.nomor_pengajuan}</td>
                                <td>{pengajuan.pengajuan}</td>
                                <td>{jenisFn(pengajuan.jenis)}</td>
                                <td>{rupiah(pengajuan.nominal)}</td>
                                <td>{statusFn(pengajuan.status)}</td>
                                <td>{new Date(pengajuan.tgl_diajukan).toLocaleDateString()}</td>
                                <td>{pengajuan.catatan}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* pagination */}
            <div className="flex mt-4 justify-center w-full">
                <div className="join">
                    {pengajuans.links.map((link) => (
                        link.url ? (
                            <button
                                key={link.label}
                                type="button"
                                disabled={!link.url}
                                onKeyDown={(e) => { if(e.key === ' ' || e.key === 'Enter') e.preventDefault() }}
                                onClick={() => link.url && router.visit(link.url, { preserveScroll: true, preserveState: true })}
                                className={`join-item btn ${link.active ? "btn-active font-bold" : ""}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span 
                                key={link.label}
                                className="join-item btn btn-disabled"
                                dangerouslySetInnerHTML={{__html: link.label}}
                            ></span>
                        )
                    ))}
                </div>
            </div>
        </section>
    )
}