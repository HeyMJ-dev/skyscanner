// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    runtimeConfig: {
        public: {
            googleAPIKey: process.env.GOOGLE_API_KEY,
            mapId: process.env.MAP_ID,
        }
    },
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap'
                },
                {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css'}
            ],
            script: [
                {
                    type: 'text/javascript',
                    src: "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js",
                }
            ]
        }
    },
    devtools: {enabled: true},
    modules: ["@nuxtjs/tailwindcss"],

})