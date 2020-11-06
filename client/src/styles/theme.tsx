import { theme as chakraTheme } from '@chakra-ui/core'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({ sm: '40em', md: '52em', lg: '64em', xl: '80em' })

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    primary: '#237ad1',
    secondary: '#6f35e3',
    danger: '#db1f4b',
  },
  fonts,
  breakpoints,
}

export default theme
