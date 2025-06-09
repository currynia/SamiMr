import { definePreset } from "@primeuix/themes";
import Lara from '@primeuix/themes/lara';
const preset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.950}',
          inverseColor: '#ffffff',
          hoverColor: '{primary.100}',
          activeColor: '{zinc.800}'
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{primary.800}',
          activeColor: '{zinc.200}'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  },
  components: {
    toolbar: {
      root: {
        borderRadius: '0',
      }
    },
    menu: {
      root: {
        borderRadius: '0'
      }
    }
  }
});

export const theme = {
  preset,
  options: {
    darkModeSelector: '.my-app-dark',
    cssLayer: {
      name: 'primevue',
      order: 'theme, base, primevue'
    }
  },
};
