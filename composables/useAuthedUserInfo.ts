export const useAuthedUserInfo = async () => {
  const getAuthedUserQuery = await useAsyncGql({
    operation: "GetAuthedUser",
    variables: {},
  });

  const { data, pending } = getAuthedUserQuery;

  const isFetching = computed(() => unref(pending) && !unref(data));

  const user = computed(() => unref(data)?.user!);

  const verifyUserHasRole = (roleSlug: string) => unref(user)?.roles.some((role) => role.slug === roleSlug);

  return {
    //
    isFetching,
    getAuthedUserQuery,

    //

    verifyUserHasRole,
    user,
  };
};
