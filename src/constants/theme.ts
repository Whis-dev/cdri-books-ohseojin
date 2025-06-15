const TYPOGRAPHY = Object.freeze({
  fontSize: {
    xxl: "24px",
    xl: "22px",
    lg: "20px",
    md: "18px",
    sm: "16px",
    xs: "14px",
    xxs: "10px"
  },

  fontWeight: {
    bold: 700,
    regular: 500,
  },

  lineHeight: {
    xxl: "24px",
    lg: "20px",
    md: "18px",
    sm: "16px",
    xs: "14px",
    xxs: "10px"
  },

}) 

const COLOR = Object.freeze({
  palette: {
    primary: "#4880EE",
    red: "#E84118",
    gray: "#DADADA",
    lightGray: "#F2F4F6",
    white: "#FFFFFF",
    black: "#222222",},
  text: {
    primary: "#353C49",
    secondary: "#6D7582",
    subtitle: "#8D94A0"
  }  
})

const DEFAULT_THEME = Object.freeze({
  typography: TYPOGRAPHY,
  color: COLOR,
})


export default DEFAULT_THEME