import { UpdateUserPasswordInput } from "#gql";

export const updateUserPassword = (body: UpdateUserPasswordInput) => {
  return GqlUpdateUserPassword({ dto: { ...body } });
};
