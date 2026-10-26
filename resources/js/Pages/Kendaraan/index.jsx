import { Link, router } from "@inertiajs/react"
import { TrashIcon,PencilSquareIcon } from "@heroicons/react/16/solid"
import Swal from "sweetalert2";

export default function Kendaraan({kendaraans}){

    const deleteButton = (kendaraanId, kendaraanNopol) => {
        Swal.fire({
            title: "Anda Yakin?",
            text: `Yakin ingin menghapus data kendaraan ${kendaraanNopol}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus"
        })
        .then((result) => {
            if (result.isConfirmed) {
                router.delete(`/kendaraans/${kendaraanId}`)
            }
        });
    }


    return (
        <section className="py-6 px-4">
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-lg font-bold">Data Kendaraan</h2>
                <Link className="btn btn-warning" href="/kendaraans/create">Tambah Kendaraan</Link>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nopol</th>
                            <th>Tahun Pembuatan</th>
                            <th>PIC</th>
                            <th>No. Rangka</th>
                            <th>No. Mesin</th>
                            <th>Pajak 1 Tahun</th>
                            <th>Pajak 5 Tahun</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {kendaraans?.data.map((kendaraan, index) => {
                            return (
                                <tr key={index+1} className="hover:bg-base-300">
                                    <td>{kendaraan.nopol}</td>
                                    <td>{kendaraan.pic}</td>
                                    <td>{kendaraan.tahun_pembuatan}</td>
                                    <td>{kendaraan.no_rangka}</td>
                                    <td>{kendaraan.no_mesin}</td>
                                    <td>{new Date(kendaraan.pajak_1_tahun).toLocaleDateString()}</td>
                                    <td>{new Date(kendaraan.pajak_5_tahun).toLocaleDateString()}</td>
                                    <td className="flex gap-4">
                                        <Link href={`/kendaraans/${kendaraan.id}/edit`} className="btn btn-info">{<PencilSquareIcon className="size-4"/>}</Link>
                                        <button className="btn btn-danger" onClick={() => deleteButton(kendaraan.id, kendaraan.nopol)}>{<TrashIcon className="size-4 text-red-500"/>}</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center w-full">
                <div className="join">
                    {kendaraans.links.map(link => (
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
        </section>

    )
}