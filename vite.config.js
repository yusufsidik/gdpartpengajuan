import { defineConfig } from 'vite';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'
import inertia from '@inertiajs/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
            ssr: 'resources/js/ssr.jsx',
        }),
        inertia(),
        tailwindcss(),
        react(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
