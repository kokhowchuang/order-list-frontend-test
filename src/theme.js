import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, blueGrey } from "@material-ui/core/colors";

const defaultTheme = {
  palette: {
    primary: blue,
    secondary: blueGrey, //ss,
    //type: "dark",
  },
  typography: {
    fontFamily: "'Open Sans', Roboto;",
  },
  status: {
    danger: "orange",
  },
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState({
    palette: {
      primary: {
        main: '#78909c'
      },
      secondary: blueGrey,
    },
    overrides: {
      MuiListItemIcon: {
        root: {
          color: '#E6E6E6',
        },
      },
      MuiListItem: {
        root: {
          '&$selected, &$selected:hover': {
            backgroundColor: '#6ad1df',
            color: '#FFFFFF',
          }
        },
        button: {
          color: '#E6E6E6',
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: 0
        },
        input: {
          padding: '12px 10px'
        }
      },
      MuiContainer: {
        root: {
          padding: '0px !important'
        }
      },
      MuiButton: {
        root: {
          borderRadius: '2px !important',
          boxShadow: 'none !important',
        },
        containedPrimary: {
          color: '#FFFFFF'
        }
      },
      MuiAutocomplete: {
        root: {
          display: 'flex',
        },
        inputRoot: {
          paddingTop: '5px !important',
          paddingBottom: '5px !important',
        }
      },
      MuiMenuItem: {
        root: {
          color: '#4D4D4D'
        }
      }
    },
  });
  const muiTheme = createMuiTheme({
    ...defaultTheme,
    ...currentTheme,
  });
  return [muiTheme, setCurrentTheme];
}
