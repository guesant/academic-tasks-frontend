export const useAppColorMode = () => {
  const colorMode = useColorMode();

  const appColorMode = ref("light");

  const loadAppColorMode = () => {
    appColorMode.value = colorMode.value;
  };

  onMounted(loadAppColorMode);

  watch(colorMode, loadAppColorMode);

  const isDark = computed(() => appColorMode.value === "dark");

  const invertTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };

  return {
    invertTheme,

    appColorMode,

    isDark,
  };
};
