import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import Layout from './Layouts/Layout'

const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const path = `./Pages/${name}.jsx`
      const pageModule = pages[path]
      
      if (!pageModule) {
        throw new Error(`Halaman tidak ditemukan: ${path}`)
      }

      // karena eager:true, pageModule sudah jadi modul, gak perlu ()
      pageModule.default.layout = pageModule.default.layout || ((page) => <Layout>{page}</Layout>)
      
      return pageModule
    },
    setup: ({ App, props }) => <App {...props} />,
  })
)