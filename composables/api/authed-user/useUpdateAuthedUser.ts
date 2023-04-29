import { UpdateUserInput } from "#gql";
import { useMutation } from "@tanstack/vue-query";
import { useAppAuthedUserInfo } from "~/composables/auth/useAppAuthedUserInfo";
import { updateUser } from "~/helpers/api/users/update-user";

export type IUpdateAuthedUserInput = Omit<UpdateUserInput, "id">;

export const useUpdateAuthedUser = () => {
  const { user, refresh: refreshAppAuthedUserInfo } = useAppAuthedUserInfo();

  const updateAuthedUserMutation = useMutation({
    mutationFn: async (body: IUpdateAuthedUserInput) => {
      await updateUser({ ...body, id: user.value!.id });
      await refreshAppAuthedUserInfo();
    },
  });

  const { isLoading, isError, mutateAsync: updateAuthedUser } = updateAuthedUserMutation;

  const errors = computed<any[] | null>(() => unref<any>(updateAuthedUserMutation.error)?.gqlErrors ?? null);

  const isBusy = computed(() => unref(isLoading) === true);

  return {
    //

    isBusy,
    isError,

    //

    errors,

    //

    updateAuthedUser,

    //

    updateAuthedUserMutation,
  };
};
