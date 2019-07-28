const path = require('path')

const { NUXT_HOST, NUXT_PORT } = process.env

module.exports = {
  /*
   ** Nuxt application mode
   */
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Router config
   */
  router: {
    middleware: ['auth/check-auth', 'auth/unauthenticated']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? `http://${NUXT_HOST}/api`
        : `http://${NUXT_HOST}:${NUXT_PORT}/api`
  },
  /*
   ** Fontawesome imports
   ** See https://www.npmjs.com/package/nuxt-fontawesome
   */
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['~/'] = path.resolve(__dirname)
      config.resolve.alias['@/'] = path.resolve(__dirname)
    }
  },
  /*
   ** Watch changes
   ** Nuxt documentation https://nuxtjs.org/api/configuration-watchers
   */
  watchers: {
    webpack: {
      poll: true
    }
  }
}
