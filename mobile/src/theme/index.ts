// @ts-ignore
import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    blue: '#364D9D',
    blue_light: '#647ac7',
    blue_flash: 'rgba(100, 122, 199, 0.2)',
    red_light: '#EE7979',
    gray: {
      100: '#1a181b',
      200: '#3e3a40',
      300: '#5f5b62',
      400: '#9f9ba1',
      500: '#d9d8da',
      600: '#edecee',
      700: '#f7f7f8',
    }
    
    
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  sizes: {
    14: 56,
    33: 148
  }
})
