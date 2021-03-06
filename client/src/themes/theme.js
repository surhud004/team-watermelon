import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#DF1B1B" },
    background: {
      default: "#fbfcff"
    }
  },
  overrides: { 
    MuiButton: { 
      root: { 
        borderRadius: '30px', 
        padding: '10px'
      }, 
    }, 
  },
});
