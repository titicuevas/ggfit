import '@chakra-ui/react';
import { Theme } from '@chakra-ui/theme';

declare module '@chakra-ui/react' {
  export interface ChakraProviderProps {
    theme?: Theme;
  }
} 