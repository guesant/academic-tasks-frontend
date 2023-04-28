const useAuthSignInCallbackUrl = () => {
  const route = useRoute();

  const callbackUrlParam = route.query.callbackUrl;
  const callbackUrl = typeof callbackUrlParam === "string" ? callbackUrlParam : "/";

  return callbackUrl;
};

export const useAuthSignIn = () => {
  const { status } = useAuthState();

  const callbackUrl = useAuthSignInCallbackUrl();

  watch(
    [status],
    ([status]) => {
      if (status === "authenticated") {
        return navigateTo(callbackUrl, { external: true });
      }
    },
    { immediate: true }
  );

  const { signIn } = useAuth();

  const credentials = reactive({
    username: "",
    password: "",
  });

  const isLoading = ref(false);
  const isError = ref(false);

  const isBusy = computed(() => unref(isLoading));
  const canSubmit = computed(() => unref(isBusy));

  const handleLoginRequest = async () => {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;
    isError.value = false;

    const result = await signIn("credentials", {
      callbackUrl,

      redirect: false,

      username: credentials.username,
      password: credentials.password,
    });

    if (!result || result.error) {
      isError.value = true;
      isLoading.value = false;
    } else {
      // No error, continue with the sign in, e.g., by following the returned redirect:

      const { url } = result;
      return navigateTo(url, { external: true });
    }
  };

  return {
    handleLoginRequest,

    isBusy,
    canSubmit,
    isLoading,
    isError,

    credentials,
  };
};
