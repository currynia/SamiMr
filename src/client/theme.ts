import { $dt, definePreset } from "@primeuix/themes";
import Material from "@primeuix/themes/material";

const preset = definePreset(Material, {
  primitive: {
    custom: {
      DEFAULT: "#2A669F",
      50: "#a0cafd",
      100: "#8CB7E1",
      200: "#6BA3D8",
      300: "#4B8FCF",
      400: "#337BBF",
      500: "#2A669F",
      600: "#25598B",
      700: "#1F4C77",
      800: "#1A3F62",
      900: "#15324E",
      950: "#122C44",
    },
  },
  semantic: {
    primary: {
      50: "{custom.50}",
      100: "{custom.100}",
      200: "{custom.200}",
      300: "{custom.300}",
      400: "{custom.400}",
      500: "{custom.500}",
      600: "{custom.600}",
      700: "{custom.700}",
      800: "{custom.800}",
      900: "{custom.900}",
      950: "{custom.950}",
    },

    colorScheme: {
      light: {
        surface: {
          DEFAULT: "#F8F9FF",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#F8F9FF",
          600: "#E9ECFF",
          700: "#D9DFFF",
          800: "#CAD2FF",
          900: "#BBC5FF",
          950: "#B3BEFF",
        },
        "surface-container": {
          lowest: "#ffffff",
          low: "#f2f3fa",
          default: "#eceef4",
          high: "#e6e8ee",
          highest: "#e1e2e8",
        },
        onSurface: {
          DEFAULT: "#191c20",
          var: "#43474e",
        },
        primary: {
          color: "{primary.500}",
          hoverColor: "{primary.400}",
        },
        text: {
          color: "{onSurface.DEFAULT}",
          mutedColor: "{onSurface.var}",
        },
      },
      dark: {
        surface: {
          DEFAULT: "#111418",
          50: "#4A5769",
          100: "#445060",
          200: "#37414E",
          300: "#2A323C",
          400: "#1E232A",
          500: "#111418",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
        "surface-container": {
          lowest: "#0b0e13",
          low: "#191c20",
          default: "#1d2024",
          high: "#272a2f",
          highest: "#32353a",
        },
        onSurface: {
          DEFAULT: "#e1e2e8",
          var: "#c3c6cf",
        },
        primary: {
          color: "{primary.50}",
          hoverColor: "{primary.100}",
        },
        text: {
          color: "{onSurface.DEFAULT}",
          mutedColor: "{onSurface.var}",
        },
      },
    },
  },
  components: {
    card: {
      root: {
        background: "{surface-container.default}",
      },
    },
    toolbar: {
      colorScheme: {
        light: {
          root: {
            background: "{surface-container.default}",
          },
        },
        dark: {
          root: {
            background: "{surface-container.default}",
          },
        },
      },
    },
    menu: {
      root: {
        borderRadius: "0",
        background: "{surface-container.default}",
      },
    },
  },
});

export const theme = {
  preset,
  options: {
    darkModeSelector: ".my-app-dark",
    cssLayer: {
      name: "primevue",
      order: "theme, base, primevue",
    },
  },
};
