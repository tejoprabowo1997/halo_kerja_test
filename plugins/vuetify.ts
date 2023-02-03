import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const customTheme = {
    dark: false,
    colors: {
      primary: '#0043A1',
      secondary: '#4082DE',
      error: '#D00000',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
      disabled: '#C9C9C9',
      input: '#F0F0F0',
      sidebarMenu: '#0F172A',
    },
  }

  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
