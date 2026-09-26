# Tutors theme

A vendored copy of [tutors-meith](https://github.com/meith-dev/tutors-meith),
the Tutors theme for Meith. `meith.config.ts` imports it by path from
`./themes/tutors-meith/src`, so it needs no package entry and no change to
the deployment files: `themes/` is copied into the image with the rest of the
board, and the board's Tailwind scan includes it.

To update it, copy `src/` from the tutors-meith repository over this
directory. Its dependencies (`@meith/theme-default`, `@meith/theme-kit`,
`@meith/ui`) come from the board's own install.
