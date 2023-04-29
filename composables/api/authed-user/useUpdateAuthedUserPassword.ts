import { UpdateUserPasswordInput } from "#gql";
import { useMutation } from "@tanstack/vue-query";
import isEqual from "lodash/isEqual";
import toPath from "lodash/toPath";
import { useAppAuthedUserInfo } from "~/composables/auth/useAppAuthedUserInfo";
import { updateUserPassword } from "~/helpers/api/users/update-user-password";

export type IUpdateAuthedUserPasswordInput = Omit<UpdateUserPasswordInput, "id">;

export const useUpdateAuthedUserPassword = () => {
  const { user } = useAppAuthedUserInfo();

  const handleUpdateAuthedUserPassword = (body: IUpdateAuthedUserPasswordInput) => {
    return updateUserPassword({ ...body, id: user.value!.id });
  };

  const updateAuthedUserPasswordQuery = useMutation({
    mutationFn: async (body: IUpdateAuthedUserPasswordInput) => {
      await handleUpdateAuthedUserPassword(body);
    },
  });

  const { mutateAsync: updateAuthedUserPassword } = updateAuthedUserPasswordQuery;

  const errors = computed<any[] | null>(() => unref<any>(updateAuthedUserPasswordQuery.error)?.gqlErrors ?? null);

  const validationErrors = computed<any[]>(() => {
    const errors_v = unref(errors) ?? [];
    return errors_v.find((error) => error.code === "validation-failed")?.errors ?? [];
  });

  const getValidationErrorsForField = (field: string) => {
    const validationErrors_v = unref(validationErrors);
    return validationErrors_v.filter((error) => isEqual(error.path, toPath(field)));
  };

  const isBusy = computed(() => unref(updateAuthedUserPasswordQuery.isLoading) === true);

  const isError = computed(() => unref(errors) !== null);

  return {
    isBusy,
    isError,

    //

    errors,
    validationErrors,

    //

    getValidationErrorsForField,

    //

    updateAuthedUserPassword,

    //

    updateAuthedUserPasswordQuery,
  };
};
