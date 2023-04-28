export default defineNuxtPlugin(async (_nuxtApp) => {
  // access cookie for auth
  const { getSession } = useAuth();

  const session = await getSession();

  const accessToken = session?.accessToken;

  if (accessToken) {
    useGqlToken(accessToken);
  }
});
