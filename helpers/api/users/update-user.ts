import { UpdateUserInput } from "#gql";

export const updateUser = (body: UpdateUserInput) => {
  return GqlUpdateUser({ dto: { ...body } });
};
