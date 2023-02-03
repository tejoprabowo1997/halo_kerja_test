// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/styles/css/custom.css'],

  build: {
    transpile: ['vuetify'],
  },

  runtimeConfig: <
    {
      appUrl: string
      mongooDbUri: string
      dbName: string
      secretKeyAccessServer: string
    }
  >{
    appUrl: process.env.APP_URL,
    mongooDbUri: process.env.MONGODB_URI,
    dbName: process.env.DB_NAME,
    secretKeyAccessServer: process.env.SECRET_KEY_ACCESS_SERVER,
  },
})
