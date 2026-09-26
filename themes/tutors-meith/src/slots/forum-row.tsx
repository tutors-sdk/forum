import type { ForumRowSlotModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'
import { Badge } from '@meith/ui'

import { Arrow, CHIP, Count, ExternalMark, LINK, META, ROW, Stamp, Tile, UserRef } from '../shared'

export function ForumRow({ forum, copy }: ForumRowSlotModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.forumRow.${key}`)
  const isLink = forum.type === 'link'

  return (
    <li data-unread={forum.isUnread ? '' : undefined} className={ROW}>
      <Tile label={forum.title} className="self-start" />

      <div className="min-w-0 [overflow-wrap:anywhere]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <a href={forum.href} className={`font-semibold text-foreground ${LINK}`}>
            {forum.title}
            {isLink && <ExternalMark />}
          </a>
          {forum.isUnread && <Badge tone="solid">{c('newPosts')}</Badge>}
        </div>

        {forum.description !== null && (
          <p className="mt-0.5 text-sm text-muted-foreground">{forum.description}</p>
        )}

        {forum.subforums.length > 0 && (
          <p className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="sr-only">{c('subforums')}</span>
            {forum.subforums.map((sub) => (
              <a
                key={sub.href}
                href={sub.href}
                className={`${CHIP} transition-colors hover:text-primary`}
              >
                {sub.label}
              </a>
            ))}
          </p>
        )}

        {!isLink && (
          <p className={META}>
            <Count value={forum.threadCount} one={c('thread.one')} many={c('thread.other')} />
            <Count value={forum.postCount} one={c('post.one')} many={c('post.other')} />
            {forum.lastPost === null ? (
              <span className="text-forum-read">{c('noPostsYet')}</span>
            ) : (
              <span className="max-w-full truncate">
                <a href={forum.lastPost.href} className={`font-medium text-foreground ${LINK}`}>
                  {forum.lastPost.threadTitle}
                </a>{' '}
                {c('by')} <UserRef user={forum.lastPost.author} className="font-normal" />{' '}
                {c('dot')} <Stamp at={forum.lastPost.at} />
              </span>
            )}
          </p>
        )}
      </div>

      <Arrow />
    </li>
  )
}
