export default defineNuxtPlugin(async (_nuxtApp) => {
  const runtime = useRuntimeConfig();

  // access cookie for auth

  const { data } = useAuth();

  const accessToken = computed(() => data.value?.accessToken);

  watch(
    [accessToken],
    ([accessToken]) => {
      if (accessToken) {
        useGqlToken(accessToken);
      }
    },
    { immediate: true }
  );

  // host

  const publicGqlHost = runtime.public.gqlHost;

  if (process.client) {
    if (publicGqlHost) {
      useGqlHost(publicGqlHost);
    }
  } else {
    const gqlHost = process.env.GQL_HOST!;

    if (gqlHost) {
      useGqlHost(gqlHost);
    }
  }
});
