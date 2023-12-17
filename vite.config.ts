import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            outDir: 'dist',
            manifest: {
                name: 'Buylist PWA',
                short_name: 'BL PWA',
                description: 'Testing PWA in Vue3',
                theme_color: '#ffffff',
                icons: [
                    {
                        'src': '/images/android-chrome-192x192.png',
                        'sizes': '192x192',
                        'type': 'image/png'
                    },
                    {
                        'src': '/images/android-chrome-384x384.png',
                        'sizes': '384x384',
                        'type': 'image/png'
                    }
                ],
            },
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                globDirectory: 'dist/',
                swDest: 'dist/sw.js'
            }
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
