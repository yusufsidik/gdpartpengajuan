import { Copyable } from "../../utils/copyable"
import { router } from "@inertiajs/react"

export default function Index(props){
    
    const {
        jumlah_pengajuan_bulan_ini, 
        jumlah_waiting_bulan_ini,
        list_pengajuan_waiting
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
            <h3 className="mb-2">Pengajuan</h3>
            <div className="flex">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Pengajuan bulan ini</div>
                        <div className="stat-value">{jumlah_pengajuan_bulan_ini}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Waiting</div>
                        <div className="stat-value">{jumlah_waiting_bulan_ini.jumlah}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Pengajuan Waiting</div>
                        {list_pengajuan_waiting.map(pengajuan => {
                            return(
                                <button
                                    key={pengajuan.nomor_pengajuan} 
                                    className="stat-desc text-slate-700 font-bold hover:text-blue-700 cursor-pointer"
                                    onClick={() => handleClickSearchNomorPengajuan(pengajuan.nomor_pengajuan)}
                                >
                                    {pengajuan.nomor_pengajuan}
                                </button>
                            )
                        })}
                    </div>
                </div>
                {/* <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                        </svg>
                        </div>
                        <div className="stat-title">Total Likes</div>
                        <div className="stat-value text-primary">25.6K</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                        </svg>
                        </div>
                        <div className="stat-title">Page Views</div>
                        <div className="stat-value text-secondary">2.6M</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar avatar-online">
                                <div className="w-16 rounded-full">
                                <img alt="Tailwind CSS stat example component" src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value">86%</div>
                        <div className="stat-title">Tasks done</div>
                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                    </div>
                </div> */}
            </div>

        </section>
    )
}