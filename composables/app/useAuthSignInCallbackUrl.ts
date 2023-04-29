import { useAppURL } from "./useAppURL";

export const useAuthSignInCallbackUrl = () => {
  const route = useRoute();

  const callbackUrl = computed(() => {
    const callbackUrlParam = route.query.callbackUrl;

    const callbackUrl = typeof callbackUrlParam === "string" && callbackUrlParam.length > 0 ? callbackUrlParam : useAppURL();

    return callbackUrl;
  });

  return callbackUrl;
};
