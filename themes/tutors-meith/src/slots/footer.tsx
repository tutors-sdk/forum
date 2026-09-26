import type { FooterModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy, linkTarget } from '@meith/theme-kit'

import { ACTION_LINK, ExternalMark, PAGE } from '../shared'

export function Footer({
  boardTitle,
  links,
  timezoneLabel,
  poweredBy,
  regions,
  copy,
}: FooterModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.footer.${key}`)

  return (
    <footer className="mt-auto border-t border-border bg-card">
      {regions?.controls && (
        <div
          className={`${PAGE} flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border py-3`}
        >
          {regions.controls}
        </div>
      )}
      <div
        className={`${PAGE} flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6`}
      >
        <span className="font-semibold text-foreground">{boardTitle}</span>

        {links.length > 0 && (
          <nav aria-label={c('nav')} className="flex flex-wrap gap-x-5 gap-y-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} {...linkTarget(link)} className={ACTION_LINK}>
                {link.label}
                {link.newTab === true && <ExternalMark />}
              </a>
            ))}
          </nav>
        )}

        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:justify-end">
          <span>
            {c('timesShownIn')} {timezoneLabel}
          </span>
          {poweredBy && (
            <a href={poweredBy.href} target="_blank" rel="noreferrer" className={ACTION_LINK}>
              {poweredBy.label}
              <ExternalMark />
            </a>
          )}
        </span>
      </div>
    </footer>
  )
}
