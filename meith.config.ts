/**
 * The board's build-time registry.
 *
 * Everything installable is named here, statically, so the bundler can see it
 * and the compiler can check it. Nothing is discovered by scanning a directory
 * at runtime — a production build contains only what the bundler could see, so a
 * directory walked at request time is empty and a plugin "installed" that way is
 * not there at all.
 *
 * Adding a theme is: `npm install` it, add a line here, redeploy. Adding a
 * plugin is the same, through board.plugins.json and meith.plugins.ts —
 * see docs/extensions/plugins.md.
 */
import { defineForumConfig } from '@meith/web/config'
import {
  BROWSER_THEME_COLOR,
  DARK_TOKENS,
  defaultMessages,
  defaultTheme,
  LIGHT_TOKENS,
} from '@meith/theme-default'
import {
  BROWSER_THEME_COLOR as TUTORS_BROWSER_THEME_COLOR,
  DARK_TOKENS as TUTORS_DARK_TOKENS,
  LIGHT_TOKENS as TUTORS_LIGHT_TOKENS,
  tutorsMeithTheme,
} from './themes/tutors-meith/src'

import { INSTALLED_PLUGINS } from './meith.plugins'

export default defineForumConfig({
  themes: {
    default: {
      key: 'default',
      title: 'Default',
      tokens: { light: LIGHT_TOKENS, dark: DARK_TOKENS },
      browserThemeColor: BROWSER_THEME_COLOR,
      theme: defaultTheme,
      messages: defaultMessages,
    },
    'tutors-meith': {
      key: 'tutors-meith',
      title: 'Tutors',
      tokens: { light: TUTORS_LIGHT_TOKENS, dark: TUTORS_DARK_TOKENS },
      browserThemeColor: TUTORS_BROWSER_THEME_COLOR,
      theme: tutorsMeithTheme,
      messages: defaultMessages,
    },
  },
  defaultTheme: 'tutors-meith',

  plugins: INSTALLED_PLUGINS,
})
