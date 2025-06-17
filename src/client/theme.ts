export const theme = {
  theme: {
    options: {
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue",
      },
    },
  },
  unstyled: true,
  pt: {
    button: {
      root: {
        class:
          "text-on-primary dark:text-on-primary-dark bg-primary-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-dark-500 dark: dark:hover:bg-primary-dark-600 focus:outline-none dark:focus:ring-blue-800",
      },
    },
  },
};
