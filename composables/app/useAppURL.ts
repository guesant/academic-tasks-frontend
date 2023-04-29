import { useRuntimeConfig } from "nuxt/app";
import { joinURL } from "ufo";
import { useRequestURL } from "./useRequestURL";

export const useAppURL = () => {
  const config = useRuntimeConfig();

  const { origin } = useRequestURL();

  return joinURL(origin, config.app.baseURL);
};
