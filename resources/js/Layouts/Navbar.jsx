import { Link } from "@inertiajs/react"

export default function Navbar(){

    const routes = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Pengajuan',
            link: '/pengajuans'
        },
        {
            name: 'Kendaraan',
            link: '/kendaraans'
        },
    ]


    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Pengajuan</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {routes.map(route => {
                            return (
                                <li key={route.link}>
                                    <Link href={route.link}>{route.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}