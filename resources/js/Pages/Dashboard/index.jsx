import { router } from "@inertiajs/react"
import { getStatusColor } from "../../utils/status"

export default function Index(props){
    
    const {
        jumlah_pengajuan_bulan_ini = 0, 
        jumlah_waiting_bulan_ini = 0,
        list_pengajuan_waiting,
        jumlah_kendaraan,
        jumlah_per_jenis_kendaraan,
        list_kendaraan_tenggang_pajak,
        list_jumlah_tabung_apar,
        total_tabung
    } = props

    const handleClickSearchNomorPengajuan = (nomor_pengajuan) => {
        router.get('/pengajuans', {
            search: nomor_pengajuan
        }, {
            preserveState: true,
            replace: true
        })
    }

    return (
        <section className="py-6 px-4">
            <div className="flex gap-6 w-full">
                {/* stat pengajuan */}
                <div>
                    <h3 className="mb-2 font-semibold">Pengajuan</h3>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Pengajuan bulan ini</div>
                            <div className="stat-value">{jumlah_pengajuan_bulan_ini ?? 0}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Waiting</div>
                            <div className="stat-value">{jumlah_waiting_bulan_ini ?? 0}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Pengajuan Waiting</div>
                            {
                                list_pengajuan_waiting.length > 0 ?
                                list_pengajuan_waiting.map(pengajuan => {
                                    return(
                                        <button
                                            key={pengajuan.nomor_pengajuan} 
                                            className="stat-desc text-slate-700 font-bold hover:text-blue-700 cursor-pointer"
                                            onClick={() => handleClickSearchNomorPengajuan(pengajuan.nomor_pengajuan)}
                                        >
                                            {pengajuan.nomor_pengajuan}
                                        </button>
                                    )
                                }) : (<span className="text-sm">Tidak ada list waiting</span>)
                            }
                        </div>
                    </div>
                </div>

                {/* stat kendaraan */}
                <div>
                    <h3 className="mb-2 font-semibold">Kendaraan</h3>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Total Kendaraan</div>
                            <div className="stat-value text-primary">{jumlah_kendaraan}</div>
                        </div>
                        {jumlah_per_jenis_kendaraan.map((kendaraan, index) => {
                            return (
                                <div className="stat" key={index}>
                                    <div className="stat-title">{kendaraan.jenis_model}</div>
                                    <div className="stat-value text-primary">{kendaraan.jumlah}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-4 rounded-lg shadow-lg p-4">
                        <h3 className="font-semibold text-sm">Tenggang pajak pembayaran kendaraan</h3>
                        <div className="overflow-x-auto mt-4">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Nopol</th>
                                        <th>Pajak 1 tahun</th>
                                        <th>Pajak 5 tahun</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { list_kendaraan_tenggang_pajak.length > 0 ? list_kendaraan_tenggang_pajak.map((kendaraan, index) => {
                                        return (
                                            <tr className="hover:bg-base-300" key={index}>
                                                <td>{kendaraan.nopol}</td>
                                                <td>
                                                    <div aria-label="status" className={getStatusColor(kendaraan.pajak_1_tahun)}></div>
                                                    {new Date(kendaraan.pajak_1_tahun).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <div aria-label="status" className={getStatusColor(kendaraan.pajak_5_tahun)}></div>
                                                    {new Date(kendaraan.pajak_5_tahun).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        )
                                    }) : (
                                        <tr className="hover:bg-base-300">
                                            <td colSpan={3} className="text-center">Tidak ada kendaraan</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="mb-2 font-semibold">Apar</h3>
                    <div className="stats shadow-lg">
                        <div className="stat">
                            <div className="text-md font-bold">Jumlah Tabung : {total_tabung}</div>
                            <div className="overflow-x-auto mt-4">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Kapasitas</th>
                                            <th>Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { list_jumlah_tabung_apar.length > 0 ? list_jumlah_tabung_apar.map((apar, index) => {
                                            return (
                                                <tr className="hover:bg-base-300" key={index}>
                                                    <td>{apar.kapasitas} Kg</td>
                                                    <td>{apar.jumlah_tabung}</td>
                                                </tr>
                                            )
                                        }) : (
                                            <tr className="hover:bg-base-300">
                                                <td colSpan={3} className="text-center">Tidak ada Apar</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}