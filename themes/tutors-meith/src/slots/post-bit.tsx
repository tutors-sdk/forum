import type { PostBitSlotModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'
import { Alert, AlertDescription, AlertTitle, Avatar, cn } from '@meith/ui'

import { CHIP, EYEBROW, groupTags, isEmptyRegion, LINK, Stamp, UserRef } from '../shared'

const VISIBILITY_TINT = {
  visible: '',
  unapproved: 'bg-post-unapproved/40',
  deleted: 'bg-destructive/5',
} as const

const BODY_X = 'px-4 sm:px-6'

function GroupBadge({
  badge,
}: {
  badge: NonNullable<PostBitSlotModel['post']['author']['badge']>
}) {
  const image = (
    <img
      src={badge.src}
      alt=""
      aria-hidden="true"
      className="h-4 w-auto max-w-full object-contain"
      loading="lazy"
      decoding="async"
    />
  )

  if (badge.darkSrc === null) return image

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={badge.darkSrc} />
      {image}
    </picture>
  )
}

export function PostBit({ post, select, regions, copy }: PostBitSlotModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.postBit.${key}`)

  const { author } = post
  const actions = regions.actions !== null && !isEmptyRegion(regions.actions)
  const pluginFooter = !isEmptyRegion(regions.pluginFooter)

  return (
    <article
      id={`post-${post.number}`}
      data-post-id={post.id}
      data-visibility={post.visibility}
      className={cn(
        'flex scroll-mt-20 flex-col bg-card target:ring-2 target:ring-primary/40 target:ring-inset',
        VISIBILITY_TINT[post.visibility],
      )}
    >
      {post.visibility !== 'visible' && (
        <Alert
          tone={post.visibility === 'deleted' ? 'error' : 'warning'}
          className="rounded-none border-x-0 border-t-0"
        >
          <AlertDescription>
            <AlertTitle>
              {post.visibility === 'deleted' ? c('deletedPost') : c('waitingApproval')}
            </AlertTitle>{' '}
            {c('staffOnly')}
          </AlertDescription>
        </Alert>
      )}

      <div className={`flex items-start gap-3 pt-4 pb-3 ${BODY_X}`}>
        <span className="relative shrink-0">
          <Avatar src={author.avatarUrl} name={author.username} size={40} className="rounded-lg" />
          {author.isOnline && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-card bg-moderation-approved"
            />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <UserRef user={author} className="font-semibold" />
            {author.isOnline && <span className="sr-only">{c('online')}</span>}
            {author.badge != null && <GroupBadge badge={author.badge} />}
            {groupTags(author.groups, author.title).map((group) => (
              <span key={group.title} className={cn(CHIP, group.nameClass)}>
                {group.title}
              </span>
            ))}
            {regions.pluginBadges}
          </p>

          <dl className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground tabular-nums">
            <div className="flex gap-1">
              <dt className="sr-only">{c('postsLabel')}</dt>
              <dd>
                <span className="font-medium text-foreground">{author.postCount.label}</span>{' '}
                {author.postCount.value === 1 ? c('post.one') : c('post.other')}
              </dd>
            </div>
            {author.reputation != null && (
              <div className="flex gap-1">
                <dt className="sr-only">{c('reputationLabel')}</dt>
                <dd>
                  <span className="font-medium text-foreground">{author.reputation.label}</span>{' '}
                  {c('reputation')}
                </dd>
              </div>
            )}
            {author.joinedAt !== null && (
              <div className="flex gap-1">
                <dt className="sr-only">{c('joined')}</dt>
                <dd>
                  {c('joined')} <Stamp at={author.joinedAt} />
                </dd>
              </div>
            )}
            {author.fields.map((field) => (
              <div key={field.label} className="flex min-w-0 gap-1">
                <dt className="font-medium">{field.label}:</dt>
                <dd className="truncate">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
          {select !== null && (
            <label className="flex min-h-6 items-center">
              <input
                type="checkbox"
                name={select.name}
                value={select.value}
                form={select.formId}
                className="size-4 accent-primary"
              />
              <span className="sr-only">{select.label}</span>
            </label>
          )}
          <a href={post.permalink} className={`inline-flex items-center gap-2 tabular-nums ${LINK}`}>
            <Stamp at={post.postedAt} />
            <span className="rounded-md bg-muted px-1.5 py-0.5 font-semibold text-foreground">
              #{post.number}
            </span>
          </a>
        </div>
      </div>

      {post.ignored !== null ? (
        <div className={`pb-4 text-sm text-muted-foreground ${BODY_X}`}>
          {c('ignoringPrefix')}{' '}
          <span className="font-medium text-foreground">{post.ignored.authorUsername}</span>.{' '}
          {c('hiddenNotice')}{' '}
          <a href={post.ignored.revealHref} className={`font-medium text-primary ${LINK}`}>
            {c('showAnyway')}
          </a>
        </div>
      ) : (
        <div className={`pb-4 ${BODY_X}`}>
          <div
            className="prose-md text-base leading-7"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
          {post.editedNote !== null && (
            <p className="mt-3 text-xs text-muted-foreground">{post.editedNote}</p>
          )}
        </div>
      )}

      {post.attachments.length > 0 && (
        <div className={`border-t border-border py-3 ${BODY_X}`}>
          <h4 className={`${EYEBROW} mb-2`}>
            {post.attachments.length}{' '}
            {post.attachments.length === 1 ? c('attachment.one') : c('attachment.other')}
          </h4>
          <ul className="flex flex-wrap gap-3">
            {post.attachments.map((file) => (
              <li key={file.id} className="max-w-full">
                <a
                  href={file.href}
                  className="group block max-w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  {file.isImage ? (
                    <img
                      src={file.thumbnailHref ?? file.href}
                      alt={file.filename}
                      width={file.width ?? undefined}
                      height={file.height ?? undefined}
                      loading="lazy"
                      decoding="async"
                      className="mb-1 max-h-56 w-auto rounded-lg border border-border object-contain"
                    />
                  ) : null}
                  <span className="block truncate">
                    <span className="font-medium group-hover:underline">{file.filename}</span>{' '}
                    <span className="opacity-70">({file.size})</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {post.ignored === null && author.signatureHtml !== null && (
        <div
          className={`prose-md border-t border-border py-2.5 text-xs text-muted-foreground ${BODY_X}`}
          dangerouslySetInnerHTML={{ __html: author.signatureHtml }}
        />
      )}

      {pluginFooter && (
        <div className={`border-t border-border py-2 text-xs empty:hidden ${BODY_X}`}>
          {regions.pluginFooter}
        </div>
      )}

      {actions && (
        <footer className={`border-t border-border py-2 empty:hidden ${BODY_X}`}>
          {regions.actions}
        </footer>
      )}
    </article>
  )
}
