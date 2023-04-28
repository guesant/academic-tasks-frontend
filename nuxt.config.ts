// https://nuxt.com/docs/api/configuration/nuxt-config

import svgLoader from "vite-svg-loader";
import { getRuntimeConfigs } from "./server/config/getRuntimeConfigs";

const configs = getRuntimeConfigs();

const AUTH_ORIGIN = configs.url ?? process.env.AUTH_ORIGIN;

const GQL_HOST = process.env.GQL_HOST!;

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      runtime: configs.url ?? undefined,
    },
  },

  modules: [
    //
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
  ],

  build: {
    transpile: [
      // ...
    ],
  },

  auth: {
    // defaultProvider: "sso-jipalab",
    provider: {
      type: "authjs",
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
        host: GQL_HOST,

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
