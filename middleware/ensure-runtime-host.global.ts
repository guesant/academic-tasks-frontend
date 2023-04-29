import { defineNuxtRouteMiddleware } from "nuxt/app";
import { $URL, isEqual } from "ufo";
import { useRequestURL } from "~/composables/app/useRequestURL";

const REDIRECT = true;

export default defineNuxtRouteMiddleware((to: any, from: any) => {
  if (!REDIRECT) {
    return;
  }

  const runtimeConfig = useRuntimeConfig();

  const runtime = runtimeConfig.public.runtime;

  if (runtime) {
    const { host: requestHost } = useRequestURL();

    const { host: runtimeHost } = new $URL(runtime);

    if (requestHost) {
      if (!isEqual(requestHost, runtimeHost)) {
        return navigateTo(runtime, { external: true });
      }
    }
  }
});
