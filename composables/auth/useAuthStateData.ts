export const useAuthStateData = () => {
  const { data, status } = useAuthState();

  const userId = computed(() => data.value?.user?.id);

  const isAuthed = computed(() => status.value === "authenticated");

  return {
    //
    data,

    userId,

    isAuthed,
    //
  };
};
