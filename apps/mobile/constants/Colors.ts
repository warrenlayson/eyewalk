const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'
const primary = '#ffde59'
const secondary = '#000e20'
const customBlack = '#121212'

export default {
  light: {
    text: customBlack,
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary,
    secondary,
  },
  dark: {
    text: '#fff',
    background: customBlack,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    primary,
    secondary,
  },
}
