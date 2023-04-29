import { useQuery } from "@tanstack/vue-query";
import { useAuthStateData } from "./useAuthStateData";

export const useAppAuthedUserInfo = () => {
  const { isAuthed, userId } = useAuthStateData();

  const getAuthedUserQuery = useQuery({
    queryKey: ["authed-user-info", userId, isAuthed],

    queryFn: () => {
      if (!isAuthed.value) {
        return Promise.resolve(null);
      }

      return GqlGetAuthedUser();
    },
  });

  const { isLoading, data } = getAuthedUserQuery;

  const user = computed(() => unref(data)?.user ?? null);

  const verifyUserHasRole = (roleSlug: string) => unref(user)?.roles.some((role) => role.slug === roleSlug);

  const refresh = async () => {
    await getAuthedUserQuery.refetch();
  };

  const { suspense } = getAuthedUserQuery;

  return {
    //

    isAuthed,
    isLoading,

    //

    user,

    //

    verifyUserHasRole,

    //

    refresh,
    suspense,
    getAuthedUserQuery,

    //
  };
};
