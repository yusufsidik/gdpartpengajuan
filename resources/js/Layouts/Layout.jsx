import { usePage } from "@inertiajs/react"
import { useEffect } from "react"
import Swal from "sweetalert2"
import Navbar from "./Navbar"

export default function Layout({children}){

    const { flash } = usePage().props

    useEffect(() => {

        if(flash.success){
            Swal.fire({
                title: "Berhasil",
                text: flash.success,
                timer: 2000,
                icon: "success",
                showConfirmButton: false
            })
        }

        if(flash.error){
            Swal.fire({
                title: "Gagal",
                text: flash.error,
                timer: 2000,
                icon: "success",
                showConfirmButton: false
            })
        }
    }, [flash])

    return (
        <>
            <div>
                <Navbar />
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}