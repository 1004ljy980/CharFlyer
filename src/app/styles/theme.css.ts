import { createTheme } from '@vanilla-extract/css';

export const mainThemeClass = createTheme({
  color: {
    mainColor: '#F5CD6D',
    subColor: '#F7E590',
  },
  typography: {
    fontFmaily: 'Pretendard',
    fontSize: '16px',
  },
  spacing: {
    tiny: '8px',
    little: '12px',
    small: '24px',
    medium: '48px',
    large: '96px',
  },
});
