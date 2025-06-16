const TYPOGRAPHY = Object.freeze({
  fontSize: {
    xxl: '24px',
    xl: '22px',
    lg: '20px',
    md: '18px',
    sm: '16px',
    xs: '14px',
    xxs: '10px',
  },

  fontWeight: {
    bold: 700,
    regular: 500,
  },

  lineHeight: {
    xxl: '24px',
    lg: '20px',
    md: '18px',
    sm: '16px',
    xs: '14px',
    xxs: '10px',
  },
});

const TYPOGRAPHY_VARIANT_STYLE: Record<
  string,
  {
    fontSize: keyof typeof TYPOGRAPHY.fontSize;
    fontWeight: keyof typeof TYPOGRAPHY.fontWeight;
    lineHeight: keyof typeof TYPOGRAPHY.lineHeight;
  }
> = Object.freeze({
  title1: {
    fontSize: 'xxl',
    fontWeight: 'bold',
    lineHeight: 'xxl',
  },
  title2: {
    fontSize: 'xl',
    fontWeight: 'bold',
    lineHeight: 'xxl',
  },
  title3: {
    fontSize: 'md',
    fontWeight: 'bold',
    lineHeight: 'md',
  },
  body1: {
    fontSize: 'lg',
    fontWeight: 'regular',
    lineHeight: 'lg',
  },
  body2: {
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: 'xs',
  },
  body2bold: {
    fontSize: 'xs',
    fontWeight: 'bold',
    lineHeight: 'xs',
  },
  caption: {
    fontSize: 'sm',
    fontWeight: 'regular',
    lineHeight: 'sm',
  },
  small: {
    fontSize: 'xxs',
    fontWeight: 'regular',
    lineHeight: 'xxs',
  },
});

const COLOR = Object.freeze({
  palette: {
    primary: '#4880EE',
    red: '#E84118',
    gray: '#DADADA',
    lightGray: '#F2F4F6',
    white: '#FFFFFF',
    black: '#222222',
  },
  text: {
    primary: '#353C49',
    secondary: '#6D7582',
    subtitle: '#8D94A0',
  },
});

const DEFAULT_THEME = Object.freeze({
  typography: TYPOGRAPHY,
  color: COLOR,
});

export { DEFAULT_THEME as default, TYPOGRAPHY_VARIANT_STYLE };
