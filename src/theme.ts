import { theme as baseTheme } from '@chakra-ui/theme';
import { extendTheme } from '@chakra-ui/theme-utils';

const theme = extendTheme({
  ...baseTheme,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Progress: {
      baseStyle: {
        track: {
          bg: 'gray.100',
        },
      },
    },
  },
});

export default theme; 