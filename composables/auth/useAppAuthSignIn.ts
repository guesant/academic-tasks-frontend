import { useMutation } from "@tanstack/vue-query";
import { useAuthSignInCallbackUrl } from "../app/useAuthSignInCallbackUrl";

type ICredentials = {
  username: string;
  password: string;
};

export const useAppAuthSignIn = () => {
  const { status } = useAuthState();

  const callbackUrlRef = useAuthSignInCallbackUrl();

  const handleLoginRequest = async (credentials: ICredentials) => {
    const callbackUrl = unref(callbackUrlRef);

    const result = await signIn("credentials", {
      callbackUrl,

      redirect: false,

      username: credentials.username,
      password: credentials.password,
    });

    if (!result || result.error) {
      throw result?.error ?? new Error("Something went wrong");
    } else {
      // No error, continue with the sign in, e.g., by following the returned redirect:
      return navigateTo(result.url, { external: true });
    }
  };

  const loginRequestMutation = useMutation({
    mutationFn: async (credentials: ICredentials) => {
      await handleLoginRequest(credentials);
    },
  });

  const { isLoading, isError, mutate } = loginRequestMutation;

  watch(
    [status],
    ([status]) => {
      if (status === "authenticated") {
        return navigateTo(unref(callbackUrlRef), { external: true });
      }
    },
    { immediate: true }
  );

  const { signIn } = useAuth();

  const isBusy = computed(() => unref(isLoading) || unref(status) !== "unauthenticated");

  return {
    //

    isBusy,
    isError,
    isLoading,

    //

    login: mutate,

    //

    loginRequestMutation,
  };
};
