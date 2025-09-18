// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/supabase'
  ],

  css: ['~/assets/css/main.css'],
  supabase : {
    redirect: true
  },
   runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL ?? 'http://localhost:3000'
    }
  },
  compatibilityDate: '2025-07-16'
})