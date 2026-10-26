import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from './Layouts/Layout'

const pages = import.meta.glob('./Pages/**/*.jsx')

createInertiaApp({
    resolve: async (name) => {

        const path = `./Pages/${name}.jsx`
        const loader = pages[path]

        if(!loader){
            throw new Error(`Halaman tidak ditemukan: ${path}`)
        }

        const page = await loader()

        page.default.layout = page.default.layout || ((page) => <Layout children={page}/>)
        
        return page
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
