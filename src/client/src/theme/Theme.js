import { createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import amber from '@material-ui/core/colors/amber'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: amber[50],
      light: amber[50]
    }
  },
  typography: {
    useNextVariants: true
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200
    }
  }
})

export default theme
