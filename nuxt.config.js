export default {
  mode: 'universal',
  env: {
    BASE_API_URL: process.env.BASE_API_URL
  },
  head: {
    title: 'hsa-games',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  
  css: [],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxt/postcss8', 
    '@nuxtjs/tailwindcss'
  ],

  modules: [],

  build: {},

  target: 'server', 

  server: {
    port: 3000, 
    host: 'localhost' 
  },
  serverMiddleware: [
    { path: '/api', handler: '~/index.js' } // Cambia la ruta para que apunte a la raíz
  ],
}

