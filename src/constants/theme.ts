const TYPOGRAPHY = Object.freeze({
  title1: {
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: 0
  },
  title2: {
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: 0
  },
  title3: {
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "18px",
    letterSpacing: 0
  },
  body1: {
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: 0
  },
  body2: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "14px",
    letterSpacing: 0
  },
  body2Bold: {
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "14px",
    letterSpacing: 0
  },
  caption: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: 0
  },
  small:{
    fontSize: "10px",
    fontWeight: 500,
    lineHeight: "10px",
    letterSpacing: 0
  }
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