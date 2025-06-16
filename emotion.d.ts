import DEFAULT_THEME from '@/constants/theme'

declare module '@emotion/react' {
    export interface Theme {
        typography: typeof DEFAULT_THEME.typography;
        color: typeof DEFAULT_THEME.color;
    }
}