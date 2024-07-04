import { createContext, useMemo } from 'react';
import createTheme from '@mui/material/styles/createTheme';

export type TModeType = 'light' | 'dark';

export const tokens = (mode: TModeType) => ({
    ...(mode === 'dark'
        ? {
              grey: {
                  100: '#e0e0e0',
                  200: '#c2c2c2',
                  300: '#a3a3a3',
                  400: '#858585',
                  500: '#666666',
                  600: '#525252',
                  700: '#3d3d3d',
                  800: '#292929',
                  900: '#141414'
              },
              primary: {
                  100: '#383842',
                  200: '#323237',
                  300: '#2f2f33',
                  400: '#27272b'
              },
              blue: {
                  100: '#9fddf3',
                  200: '#10a9e2',
                  300: '#076c93'
              },
              text: {
                  primary: '#ffffff'
              }
          }
        : {
              grey: {
                  100: '#141414',
                  200: '#292929',
                  300: '#3d3d3d',
                  400: '#525252',
                  500: '#666666',
                  600: '#858585',
                  700: '#a3a3a3',
                  800: '#c2c2c2',
                  900: '#e0e0e0'
              },
              primary: {
                  100: '#c7c7bd',
                  200: '#cdcdc8',
                  300: '#d0d0cc',
                  400: '#d8d8d4'
              },
              blue: {
                  100: '#9fddf3',
                  200: '#10a9e2',
                  300: '#076c93'
              },
              text: {
                  primary: '#4f4f4f'
              }
          })
});

export const themeSettings = (mode: TModeType) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          lighter: colors.primary[100],
                          light: colors.primary[200],
                          main: colors.primary[300],
                          dark: colors.primary[400]
                      },
                      secondary: {
                          light: colors.blue[100],
                          main: colors.blue[200],
                          dark: colors.blue[300]
                      },
                      neutral: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100]
                      },
                      background: {
                          default: colors.primary[300]
                      }
                  }
                : {
                      primary: {
                          lighter: colors.primary[400],
                          light: colors.primary[300],
                          main: colors.primary[200],
                          dark: colors.primary[100]
                      },
                      secondary: {
                          light: colors.blue[100],
                          main: colors.blue[200],
                          dark: colors.blue[300]
                      },
                      neutral: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100]
                      },
                      background: {
                          default: colors.primary[200]
                      }
                  })
        },
        typography: {
            fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
            fontSize: 12,
            h1: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 40
            },
            h2: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 32
            },
            h3: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 24
            },
            h4: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 20
            },
            h5: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 16
            },
            h6: {
                fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
                fontSize: 14
            }
        }
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = (mode: TModeType) => {
    return useMemo(() => createTheme(themeSettings(mode)), [mode]);
};
