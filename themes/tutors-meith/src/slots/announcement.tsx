import type { AnnouncementModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'

import { ACTION_LINK, EYEBROW, PANEL, Stamp, UserRef } from '../shared'

export function Announcement({
  title,
  bodyHtml,
  postedBy,
  postedAt,
  forum,
  copy,
}: AnnouncementModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.announcement.${key}`)

  return (
    <article className={`${PANEL} flex flex-col gap-2 px-5 py-4`}>
      <p className={`${EYEBROW} flex flex-wrap items-center gap-x-2 normal-case`}>
        <span>
          {postedBy === null ? (
            c('posted')
          ) : (
            <>
              {c('postedBy')} <UserRef user={postedBy} className="font-semibold" />
            </>
          )}{' '}
          <Stamp at={postedAt} />
        </span>
        {forum !== null && (
          <>
            <span aria-hidden="true">·</span>
            <a href={forum.href} className={ACTION_LINK}>
              {forum.label}
            </a>
          </>
        )}
      </p>
      <h2 className="text-lg font-semibold text-foreground text-balance">{title}</h2>
      <div className="prose-md text-sm" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </article>
  )
}
