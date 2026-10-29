import { Link, router } from "@inertiajs/react"
import { useState, useRef } from "react";
import { PencilSquareIcon, CheckIcon, XMarkIcon, TrashIcon } from "@heroicons/react/16/solid"
import Swal from "sweetalert2";
import { status as statusFn, jenis as jenisFn } from "../../utils/status";
import { rupiah } from "../../utils/rupiah";

export default function Pengajuan({pengajuans, filters, defaultStart, defaultEnd}){

    const [startDate, setStartDate] = useState(filters.start_date || defaultStart)
    const [endDate, setEndDate] = useState(filters.end_date || defaultEnd)
    const [search, setSearch] = useState(filters.search || '')

    const modalRef = useRef(null);
    const keteranganRef = useRef(null);
    const catatanRef = useRef(null);


    const handleSearch = (e) => {
        e.preventDefault()
        router.get('/pengajuans', { 
            search: search
        }, {
            preserveState: true, 
            replace: true
        })
    }

    const handleFilter = (e) => {
        e.preventDefault()

        if(startDate && endDate){
            const start = new Date(startDate)
            const end = new Date(endDate)
            const diffDays = (end - start) / (1000 * 60 * 60 * 24)

            if(diffDays < 0){
                Swal.fire({
                    title: "Peringatan",
                    text: "Tanggal akhir tidak boleh sebelum tanggal awal",
                    timer: 2000,
                    icon: "warning",
                    showConfirmButton: false
                })
                return
            }

            if(diffDays > 92){
                Swal.fire({
                    title: "Peringatan",
                    text: "Maksimal pengambilan data hanya 3 bulan",
                    timer: 2000,
                    icon: "warning",
                    showConfirmButton: false
                })
                return
            }

            router.get('/pengajuans', {
                start_date: startDate,
                end_date: endDate
            }, {
                preserveState:true,
                replace: true
            })
        }
    }

    const handleReset = () => {
        setStartDate(defaultStart)
        setEndDate(defaultEnd)
        setSearch('')
        router.get('/pengajuans')
    }

    const updateStatus = async (pengajuan, status) => {

        const text = status === 'APPROVED' ? 'Setujui' : 'Tolak'
        const color = status === 'APPROVED' ? '#3085d6' : '#d33'

        const { value: catatan, isConfirmed } = await Swal.fire({
            title: `${text} pengajuan ini?`,
            input: "textarea",
            icon: "warning",
            inputLabel: "Berikan catatan jika ada",
            inputPlaceholder: "ketik catatan disini...",
            inputPlaceholder: "Masukkan catatan",
            confirmButtonColor: color,
            confirmButtonText: `Ya, ${text}`,
            cancelButtonText: "Batal",
            showCancelButton: true
        })

        if(!isConfirmed) return

        router.put(`/pengajuans/${pengajuan.id}/status`, 
        {
            status: status,
            catatan: catatan
        }, {
            preserveScroll: true,
            onSuccess: () => Swal.fire('Berhasil', `Pengajuan Di${text}`, 'success')
        })
        
    }

    const buttonStatus = (pengajuan) => {

        if(pengajuan.status === "WAITING"){
            return (
                <>  
                    <Link 
                        className="btn btn-sm btn-success" 
                        onClick={() => updateStatus(pengajuan, "APPROVED")}
                        aria-label="ApprovedButton"
                        onKeyDown={(e) => e.preventDefault()}
                    >
                        {<CheckIcon className="size-4"/>}
                    </Link>
                    <Link 
                        className="btn btn-sm btn-error" 
                        onClick={() => updateStatus(pengajuan, "REJECTED")}
                        aria-label="RejectedButton"
                        onKeyDown={(e) => e.preventDefault()}
                    >
                        {<XMarkIcon className="size-4"/>}
                    </Link>
                </>
            )
        }
        return
    }

    const openModal = (p) => {
        if(keteranganRef.current) keteranganRef.current.textContent = p.keterangan;
        if(catatanRef.current) catatanRef.current.textContent = p.catatan;
        modalRef.current?.showModal();
    }

    const deletePengajuan = async (pengajuan, e) => {
        e.currentTarget.blur()
        const result = await Swal.fire({
            title: `Hapus pengajuan ${pengajuan.nomor_pengajuan}?`,
            text: "Data masih bisa dikembalikan",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            confirmButtonColor: "#d33"
        })

        if(result.isConfirmed){
            router.delete(`/pengajuans/${pengajuan.id}`, {
                preserveScroll: true,
                onSuccess: () => Swal.fire('Terhapus', '', 'success')
            })
        }
    }

    return (
        <section className="py-6 px-4">
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-lg font-bold">Data Pengajuan</h2>
                <div className="flex justify-center items-start">
                    <div>
                        <h3 className="text-xs mb-2 font-semibold">Rentang maksimal 3 bulan</h3>
                        <form onSubmit={handleFilter} className="flex gap-2 items-center">
                            <input 
                                type="date" 
                                className="input input-sm active:border-none" 
                                id="start_date" 
                                name="start_date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                            />
                            <span className="text-sm">-</span>
                            <input 
                                type="date" 
                                className="input input-sm active:border-none" 
                                id="end_date" 
                                name="end_date" 
                                value={endDate}
                                onChange={e =>  setEndDate(e.target.value)} 
                            />
                            <button type="submit" className="btn btn-sm btn-primary">Filter</button>
                        </form>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div>
                        <h4 className="text-xs mb-2 font-semibold">Cari Nomor Pengajuan</h4>
                        <form onSubmit={handleSearch}>
                            <div className="join">
                                <input 
                                    type="text" 
                                    className="input input-sm join-item"  
                                    placeholder="PGJ-xxxx" 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button className="btn btn-sm join-item" type="submit">Cari</button>
                            </div>
                        </form>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div>
                        <h4 className="text-xs mb-2 font-semibold">Reset tanggal dan pencarian</h4>
                        <button type="reset" onClick={handleReset} className="btn btn-sm btn-warning">Reset</button>
                    </div>
                </div>

                <Link className="btn btn-warning" href="/pengajuans/create">Buat Pengajuan</Link>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table table-sm">
                    <thead>
                        <tr className="text-center text-xs">
                            <th>Nomor Pengajuan</th>
                            <th>Nopol</th>
                            <th>Pengajuan</th>
                            <th>Jenis</th>
                            <th>Nominal</th>
                            <th>Tanggal Diajukan</th>
                            <th>Status</th>
                            <th>Tanggal ACC</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pengajuans?.data.map((pengajuan, index) => {
                            return (
                                <tr key={index+1} className="hover:bg-base-300">
                                    <td>{pengajuan.nomor_pengajuan}</td>
                                    <td className="font-bold">{pengajuan.nopol}</td>
                                    <td>{pengajuan.pengajuan}</td>
                                    <td>{jenisFn(pengajuan.jenis)}</td>
                                    <td className="font-bold">{rupiah(pengajuan.nominal)}</td>
                                    <td>{new Date(pengajuan.tgl_diajukan).toLocaleDateString()}</td>
                                    <td>{statusFn(pengajuan.status)}</td>
                                    <td>{pengajuan.tgl_acc ? new Date(pengajuan.tgl_acc).toLocaleDateString() : ''}</td>
                                    <td className="flex gap-2 justify-center">
                                        {buttonStatus(pengajuan)}
                                        <div className="divider divider-horizontal"></div>
                                        <button 
                                            className="btn btn-sm btn-info" 
                                            onClick={() => openModal(pengajuan)}
                                            aria-label="CatatanButton"
                                            onKeyDown={(e) => {
                                                if (e.key === ' ' || e.key === 'Enter') e.preventDefault();
                                            }}
                                        >
                                            {<PencilSquareIcon className="size-4"/>}
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-error" 
                                            onClick={(e) => deletePengajuan(pengajuan, e)}
                                            aria-label="DeleteButton"
                                            onKeyDown={(e) => {
                                                if (e.key === ' ' || e.key === 'Enter') e.preventDefault();
                                            }}
                                        >
                                            {<TrashIcon className="size-4"/>}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center w-full">
                <div className="join">
                    {pengajuans.links.map(link => (
                        link.url ? 
                        <Link key={link.label}
                            href={link.url}
                            className={`join-item btn ${link.active ? "btn-active font-bold" : ""}`}
                            dangerouslySetInnerHTML={{__html: link.label}}
                        /> : (
                        <span 
                            key={link.label}
                            className="join-item btn btn-disabled"
                            dangerouslySetInnerHTML={{__html: link.label}}
                        ></span>
                        )
                    ))}
                </div>
            </div>
            <dialog id="modal_keterangan" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Catatan</h3>
                    <div className="divider"></div>
                    <p className="py-4" ref={catatanRef}></p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </section>

    )
}