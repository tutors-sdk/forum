import type { SlotCopy, SubforumListModel } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'

import { EYEBROW, ExternalMark } from '../shared'

export function SubforumList({ forums, copy }: SubforumListModel & { copy: SlotCopy }) {
  if (forums.length === 0) return null

  const c = (key: string) => fromSlotCopy(copy, `default.subforumList.${key}`)

  return (
    <section aria-labelledby="subforums-heading" className="flex flex-col gap-2">
      <h2 id="subforums-heading" className={EYEBROW}>
        {c('heading')}
      </h2>

      <ul className="flex flex-wrap gap-2">
        {forums.map((forum) => (
          <li key={forum.id}>
            <a
              href={forum.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <span
                aria-hidden="true"
                className="flex size-6 items-center justify-center rounded-md bg-muted text-xs font-semibold text-primary"
              >
                {(Array.from(forum.title.trim())[0] ?? '?').toUpperCase()}
              </span>
              {forum.title}
              {forum.type === 'link' ? (
                <ExternalMark />
              ) : (
                <span className="text-xs text-muted-foreground tabular-nums">
                  {forum.threadCount.label}
                  <span className="sr-only">
                    {' '}
                    {forum.threadCount.value === 1 ? c('thread.one') : c('thread.other')}
                  </span>
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
