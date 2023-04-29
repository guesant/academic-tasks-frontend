import isEqual from "lodash/isEqual";
import toPath from "lodash/toPath";

export const useValidationErrors = (errors: Ref<any>) => {
  const validationErrors = computed<any[]>(() => {
    const errors_v = unref(errors) ?? [];

    if (Array.isArray(errors_v)) {
      return errors_v.find((error) => error.code === "validation-failed")?.errors ?? [];
    }
  });

  const getValidationErrorsForField = (field: string) => {
    const validationErrors_v = unref(validationErrors);
    return validationErrors_v.filter((error) => isEqual(error.path, toPath(field)));
  };

  return {
    validationErrors,
    getValidationErrorsForField,
  };
};
