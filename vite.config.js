import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest: false,
            workbox: {
                globPatterns: ["**/*.{html,js,css,woff2,webp,jpg,ico}"],
                navigateFallbackDenylist: [/^\/api(?:\/|$)/]
            },
            injectRegister: "script-defer",
        })
    ],
    server: {
        host: "0.0.0.0",
        port: 8080,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8090"
            }
        }
    }
});
