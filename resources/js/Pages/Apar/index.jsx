import { Link } from "@inertiajs/react"
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid"
import Swal from "sweetalert2"
import { router } from "@inertiajs/react"
import { getStatusColor } from "../../utils/status"

export default function Index({apars, total_apar, rekap}){

    const deleteButton = (apar, e) => {
        e.currentTarget.blur()
        Swal.fire({
            title: "Anda Yakin?",
            text: `Yakin ingin menghapus Apar di ${apar.lokasi} - ${apar.kapasitas}kg?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus"
        })
        .then((result) => {
            if (result.isConfirmed) {
                router.delete(`/apars/${apar.id}`)
            }
        });
    }

    return (
        <section className="py-6 px-4">
            <div className="flex justify-between items-center mb-4 w-full">
                <div className="flex gap-2">
                    <h2 className="text-lg font-bold">Data Apar</h2>
                    <div className="divider divider-horizontal"></div>
                    <span>Jumlah Tabung : {total_apar}</span>
                </div>
                <Link className="btn btn-warning" href="/apars/create">
                    <PlusIcon className="size-4" />Tambah Apar
                </Link>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table table-sm">
                    <thead>
                        <tr className="text-center">
                            <th>Merk</th>
                            <th>Kapasitas</th>
                            <th>Lokasi</th>
                            <th>Starting Date</th>
                            <th>Next Date</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {apars.map((apar, index) => {
                            return (
                                <tr key={index+1} className="hover:bg-base-300 text-center">
                                    <td className="font-bold">{apar.merk}</td>
                                    <td className="font-semibold">{apar.kapasitas} kg</td>
                                    <td>{apar.lokasi}</td>
                                    <td>
                                        {new Date(apar.starting_date).toLocaleDateString() }
                                    </td>
                                    <td>
                                        <div aria-label="status" className={getStatusColor(apar.next_date)}></div>
                                        {new Date(apar.next_date).toLocaleDateString() }
                                    </td>
                                    <td>{apar.type}</td>
                                    <td className="flex gap-4">
                                        <Link 
                                            href={`/apars/${apar.id}/edit`} 
                                            className="btn btn-info"
                                        >
                                            {<PencilSquareIcon className="size-4"/>}
                                        </Link>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={(e) => deleteButton(apar, e)}
                                            onKeyDown={(e) => {
                                                if (e.key === ' ' || e.key === 'Enter') e.preventDefault();
                                            }}
                                        >
                                            {<TrashIcon className="size-4 text-red-500"/>}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    )
}