import { DARK_TOKENS as DEFAULT_DARK, LIGHT_TOKENS as DEFAULT_LIGHT } from '@meith/theme-default'

export const LIGHT_TOKENS: Record<string, string> = {
  ...DEFAULT_LIGHT,
  background: '#f6f6f6',
  foreground: '#202020',
  surface: '#efefef',
  card: '#ffffff',
  'card-foreground': '#202020',
  primary: '#246f78',
  'primary-foreground': '#ffffff',
  'primary-hover': '#1c5961',
  secondary: '#e6e6e6',
  'secondary-foreground': '#202020',
  muted: '#efefef',
  'muted-foreground': '#636363',
  accent: '#e6e6e6',
  'accent-foreground': '#202020',
  border: '#dcdcdc',
  input: '#858585',
  ring: '#246f78',
  radius: '0.5rem',
  'forum-unread': '#202020',
  'forum-read': '#636363',
}

export const DARK_TOKENS: Record<string, string> = {
  ...DEFAULT_DARK,
  background: '#111111',
  foreground: '#f2f2f2',
  surface: '#161616',
  card: '#1b1b1b',
  'card-foreground': '#f2f2f2',
  primary: '#7dcbd3',
  'primary-foreground': '#111111',
  'primary-hover': '#9ad9df',
  secondary: '#262626',
  'secondary-foreground': '#f2f2f2',
  muted: '#262626',
  'muted-foreground': '#bdbdbd',
  accent: '#292929',
  'accent-foreground': '#f2f2f2',
  border: '#3a3a3a',
  input: '#6f6f6f',
  ring: '#7dcbd3',
  radius: '0.5rem',
  'forum-unread': '#f2f2f2',
  'forum-read': '#bdbdbd',
}

export const BROWSER_THEME_COLOR = {
  light: '#f6f6f6',
  dark: '#111111',
} as const
