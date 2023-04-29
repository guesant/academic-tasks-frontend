// https://nuxt.com/docs/api/configuration/nuxt-config

import svgLoader from "vite-svg-loader";
import { getRuntimeConfigs } from "./server/config/getRuntimeConfigs";

const configs = getRuntimeConfigs();

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      runtime: configs.url ?? undefined,
      gqlHost: configs.gqlHost,
    },
  },

  modules: [
    //
    "@vueuse/nuxt",

    "nuxt-graphql-client",

    "@sidebase/nuxt-auth",

    "@nuxtjs/color-mode",
  ],

  vite: {
    plugins: [
      // ...
      svgLoader({}),
    ],

    define: {
      // "process.env.DEBUG": false,
    },
  },

  css: [
    // ...
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.css",
  ],

  build: {
    transpile: [
      // ...
      "vuetify",
    ],
  },

  auth: {
    session: {
      enableRefreshPeriodically: 3 * 1000,
      enableRefreshOnWindowFocus: true,
    },

    provider: {
      type: "authjs",
      addDefaultCallbackUrl: true,
    },

    baseURL: configs.authBaseURL,
  },

  "graphql-client": {
    watch: true,
    autoImport: true,
    functionPrefix: "Gql",
    documentPaths: ["./graphql"],
    preferGETQueries: false,

    codegen: {
      silent: true,
      skipTypename: true,
      useTypeImports: true,
      dedupeFragments: true,
      onlyOperationTypes: true,
      disableOnBuild: false,
    },

    clients: {
      default: {
        host: configs.gqlHost,

        retainToken: true,

        //     // Basic
        //     token: "<auth_token>",

        //     // Advanced
        //     token: {
        //       type: "Bearer",
        //       name: "Authorization",
        //       value: "<auth_token>",
        //     },
      },
    },
  },
});
