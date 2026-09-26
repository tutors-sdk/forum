import type { SlotCopy, ThreadRowSlotModel } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'
import { Avatar, Badge } from '@meith/ui'

import { Arrow, Count, LINK, META, Prefix, ROW, Stamp, UserRef } from '../shared'

export function ThreadRow({
  thread,
  select,
  regions,
  copy,
}: ThreadRowSlotModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.threadRow.${key}`)

  const hidden = thread.visibility === 'deleted' || thread.visibility === 'unapproved'
  const tint = thread.visibility === 'deleted' ? 'bg-thread-deleted/8' : 'bg-thread-unapproved/8'

  return (
    <li
      data-unread={thread.isUnread ? '' : undefined}
      data-visibility={hidden ? thread.visibility : undefined}
      className={`${ROW} ${hidden ? tint : ''}`}
    >
      <span className="flex items-center gap-2.5 self-start">
        {select !== null && (
          <label className="flex shrink-0 items-center">
            <span className="sr-only">{select.label}</span>
            <input
              type="checkbox"
              name={select.name}
              value={select.value}
              form={select.formId}
              className="size-4 accent-primary"
            />
          </label>
        )}
        <Avatar src={null} name={thread.author.username} size={40} className="rounded-lg" />
      </span>

      <div className="min-w-0 [overflow-wrap:anywhere]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {thread.prefix !== null && <Prefix prefix={thread.prefix} />}
          {thread.isSticky && <Badge tone="pinned">{c('pinned')}</Badge>}
          {thread.isLocked && <Badge tone="locked">{c('locked')}</Badge>}
          {thread.isMoved && <Badge tone="moved">{c('moved')}</Badge>}
          {thread.visibility === 'unapproved' && (
            <Badge tone="unapproved">{c('unapproved')}</Badge>
          )}
          {thread.visibility === 'deleted' && <Badge tone="deleted">{c('deleted')}</Badge>}

          <a href={thread.href} className={`font-semibold text-foreground ${LINK}`}>
            {thread.title}
          </a>
          {thread.isUnread && <Badge tone="solid">{c('newPosts')}</Badge>}
          {regions?.pluginBadges}
        </div>

        <p className="mt-0.5 text-sm text-muted-foreground">
          {c('startedBy')} <UserRef user={thread.author} className="font-normal" />
        </p>

        <p className={META}>
          <Count value={thread.replyCount} one={c('reply.one')} many={c('reply.other')} />
          <Count value={thread.viewCount} one={c('view.one')} many={c('view.other')} />
          {thread.lastPost === null ? (
            <span className="text-thread-moved">{c('noRepliesYet')}</span>
          ) : (
            <span className="max-w-full truncate">
              <a href={thread.lastPost.href} className={`font-medium text-foreground ${LINK}`}>
                {c('latestReply')}
              </a>{' '}
              {c('by')} <UserRef user={thread.lastPost.author} className="font-normal" />{' '}
              {c('dot')} <Stamp at={thread.lastPost.at} />
            </span>
          )}
        </p>
      </div>

      <Arrow />
    </li>
  )
}
