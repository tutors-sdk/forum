import type { LatestThreadsModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'
import { Empty, EmptyDescription, EmptyTitle } from '@meith/ui'

import { ACTION_LINK, Arrow, CHIP, LINK, PANEL, PanelHead, Stamp, UserRef } from '../shared'

export function LatestThreads({
  threads,
  capturedAt,
  copy,
}: LatestThreadsModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.latestThreads.${key}`)

  return (
    <section aria-labelledby="latest-threads-heading" className={PANEL}>
      <PanelHead
        id="latest-threads-heading"
        title={c('heading')}
        aside={
          <p className="text-xs text-muted-foreground tabular-nums">
            {c('asOf')} <Stamp at={capturedAt} />
          </p>
        }
      />

      {threads.length === 0 ? (
        <Empty className="py-6">
          <EmptyTitle>{c('nothingYet')}</EmptyTitle>
          <EmptyDescription>{c('emptyDescription')}</EmptyDescription>
        </Empty>
      ) : (
        <ul className="divide-y divide-border">
          {threads.map((thread) => (
            <li
              key={thread.href}
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={thread.href}
                  className={`line-clamp-2 text-sm font-medium text-foreground ${LINK}`}
                >
                  {thread.title}
                </a>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground">
                  <span className={`${CHIP} tabular-nums`}>
                    {thread.replyCount.label}
                    <span className="sr-only">
                      {' '}
                      {thread.replyCount.value === 1 ? c('reply.one') : c('reply.other')}
                    </span>
                  </span>
                  <UserRef user={thread.author} className="font-normal" /> {c('in')}{' '}
                  <a href={thread.forum.href} className={ACTION_LINK}>
                    {thread.forum.label}
                  </a>{' '}
                  {c('dot')} <Stamp at={thread.startedAt} />
                </p>
              </div>
              <Arrow />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
