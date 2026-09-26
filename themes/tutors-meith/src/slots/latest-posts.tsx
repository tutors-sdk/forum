import type { LatestPostsModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'
import { Avatar, Empty, EmptyDescription, EmptyTitle } from '@meith/ui'

import { ACTION_LINK, Arrow, LINK, PANEL, PanelHead, Stamp, UserRef } from '../shared'

export function LatestPosts({ posts, capturedAt, copy }: LatestPostsModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.latestPosts.${key}`)

  return (
    <section aria-labelledby="latest-posts-heading" className={PANEL}>
      <PanelHead
        id="latest-posts-heading"
        title={c('heading')}
        aside={
          <p className="text-xs text-muted-foreground tabular-nums">
            {c('asOf')} <Stamp at={capturedAt} />
          </p>
        }
      />

      {posts.length === 0 ? (
        <Empty className="py-6">
          <EmptyTitle>{c('nothingYet')}</EmptyTitle>
          <EmptyDescription>{c('emptyDescription')}</EmptyDescription>
        </Empty>
      ) : (
        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li
              key={post.href}
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/50"
            >
              <Avatar src={null} name={post.author.username} size={32} className="rounded-lg" />
              <div className="min-w-0 flex-1">
                <a
                  href={post.href}
                  className={`block truncate text-sm font-medium text-foreground ${LINK}`}
                >
                  {post.threadTitle}
                </a>
                {post.excerpt !== '' && (
                  <p className="line-clamp-2 text-xs text-muted-foreground">{post.excerpt}</p>
                )}
                <p className="truncate text-xs text-muted-foreground">
                  <UserRef user={post.author} className="font-normal" /> {c('in')}{' '}
                  <a href={post.forum.href} className={ACTION_LINK}>
                    {post.forum.label}
                  </a>{' '}
                  {c('dot')} <Stamp at={post.postedAt} />
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
