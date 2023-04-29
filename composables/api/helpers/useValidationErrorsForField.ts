import { useValidationErrors } from "./useValidationErrors";

export const useValidationErrorsForField = (errors: Ref<any>, field: string) => {
  const { getValidationErrorsForField } = useValidationErrors(errors);

  const fieldErrors = ref<any[]>([]);

  const syncFieldErrors = () => {
    fieldErrors.value = getValidationErrorsForField(field).map((error) => {
      switch (error.code) {
        default: {
          return error;
        }
      }
    });
  };

  watch(
    [() => getValidationErrorsForField(field)],

    ([]) => {
      syncFieldErrors();
    },

    { immediate: true }
  );

  const resetFieldErrors = () => {
    fieldErrors.value = [];
  };

  return {
    fieldErrors,
    syncFieldErrors,
    resetFieldErrors,
  };
};
