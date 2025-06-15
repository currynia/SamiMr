import { $dt, definePreset } from "@primeuix/themes";
import Material from "@primeuix/themes/material";

const preset = definePreset(Material, {
  semantic: {
    colorScheme: {
      light: {
        primaryShades: {
          DEFAULT: "#0B6780",
          50: "#52CEF0",
          100: "#40C9EF",
          200: "#1ABFEB",
          300: "#11A3CB",
          400: "#0E85A6",
          500: "#0B6780",
          600: "#095469",
          700: "#074151",
          800: "#052E3A",
          900: "#031B22",
          950: "#021216",
        },
        surface: {
          DEFAULT: "#F5FAFD",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FEFEFF",
          400: "#F9FCFE",
          500: "#F5FAFD",
          600: "#E4F1FA",
          700: "#D3E9F6",
          800: "#C2E0F3",
          900: "#B1D8EF",
          950: "#A9D4EE",
        },
        container: {
          tertiary: "#e1dfff",
        },
        onContainer: {
          tertiary: "#434465",
        },
        surfaceContainer: {
          lowest: "#ffffff",
          low: "#f0f4f7",
          default: "#eaeef2",
          high: "#e4e9ec",
          highest: "#dee3e6",
        },
        onSurface: {
          DEFAULT: "#171c1f",
          var: "#40484c",
        },
        primary: {
          color: "{primaryShades.500}",
          hoverColor: "{primaryShades.400}",
          onPrimary: "#ffffff",
        },
        text: {
          color: "{onSurface.DEFAULT}",
          mutedColor: "{onSurface.var}",
        },
      },
      dark: {
        primaryShades: {
          DEFAULT: "#89D0ED",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#E6F5FB",
          300: "#C7E9F6",
          400: "#A8DCF2",
          500: "#89D0ED",
          600: "#54BBE5",
          700: "#21A5DA",
          800: "#197DA5",
          900: "#115570",
          950: "#0D4156",
        },
        surface: {
          DEFAULT: "#0F1417",
          50: "#3C505C",
          100: "#374A55",
          200: "#2D3C45",
          300: "#232F36",
          400: "#192126",
          500: "#0F1417",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
        container: {
          tertiary: "#434465",
        },
        onContainer: {
          tertiary: "#e1dfff",
        },
        surfaceContainer: {
          lowest: "#0a0f11",
          low: "#171c1f",
          default: "#1b2023",
          high: "#252b2d",
          highest: "#303638",
        },
        onSurface: {
          DEFAULT: "#dee3e6",
          var: "#c0c8cc",
        },
        primary: {
          color: "{primaryShades.500}",
          hoverColor: "{primaryShades.400}",
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
        background: "{surfaceContainer.low}",
        borderRadius: "12px",
      },
    },
    toolbar: {
      colorScheme: {
        light: {
          root: {
            background: "{surfaceContainer.default}",
          },
        },
        dark: {
          root: {
            background: "{surfaceContainer.default}",
          },
        },
      },
    },
    menu: {
      root: {
        background: "{surfaceContainer.highest}",
        color: "{onSurface.default}",
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
