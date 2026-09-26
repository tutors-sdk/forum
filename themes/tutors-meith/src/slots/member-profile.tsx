import type { MemberProfileModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'
import { Avatar, buttonVariants, cn } from '@meith/ui'

import { CHIP, groupTags, H1, PAGE_BODY, PANEL, PanelHead, Stamp } from '../shared'

export function MemberProfile({
  user,
  avatarUrl,
  title,
  groups,
  joinedAt,
  lastVisitAt,
  postCount,
  signatureHtml,
  fields,
  actions,
  regions,
  copy,
}: MemberProfileModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.memberProfile.${key}`)

  return (
    <div className={PAGE_BODY}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar src={avatarUrl} name={user.username} size={72} className="rounded-xl" />
          <div className="min-w-0">
            <h1 className={cn(H1, 'break-words', user.nameClass)}>{user.username}</h1>
            <p className="mt-1.5 flex flex-wrap gap-1.5">
              {groupTags(groups, title).map((group) => (
                <span key={group.title} className={cn(CHIP, group.nameClass)}>
                  {group.title}
                </span>
              ))}
            </p>
          </div>
        </div>

        {actions.length > 0 && (
          <nav aria-label={c('memberActions')} className="flex shrink-0 flex-wrap items-center gap-2">
            {actions.map((action, index) => (
              <a
                key={action.href}
                href={action.href}
                className={buttonVariants({ variant: index === 0 ? 'primary' : 'outline' })}
              >
                {action.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      <dl className={`${PANEL} grid grid-cols-3 divide-x divide-border`}>
        <div className="px-5 py-4">
          <dd className="text-2xl font-semibold text-foreground tabular-nums">{postCount.label}</dd>
          <dt className="text-xs text-muted-foreground">{c('postsLabel')}</dt>
        </div>
        <div className="px-5 py-4">
          <dd className="text-sm font-medium text-foreground">
            <Stamp at={joinedAt} />
          </dd>
          <dt className="text-xs text-muted-foreground">{c('joinedLabel')}</dt>
        </div>
        <div className="px-5 py-4">
          <dd className="text-sm font-medium text-foreground">
            {lastVisitAt === null ? c('never') : <Stamp at={lastVisitAt} />}
          </dd>
          <dt className="text-xs text-muted-foreground">{c('lastVisitLabel')}</dt>
        </div>
      </dl>

      {fields.length > 0 && (
        <section aria-labelledby="profile-fields-heading" className={PANEL}>
          <PanelHead id="profile-fields-heading" title={c('about')} />
          <dl className="grid gap-x-6 gap-y-4 px-5 py-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.label}>
                <dt className="text-xs text-muted-foreground">{field.label}</dt>
                <dd className="mt-0.5 text-sm break-words">{field.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {signatureHtml !== null && (
        <section aria-labelledby="profile-signature-heading" className={PANEL}>
          <PanelHead id="profile-signature-heading" title={c('signature')} />
          <div
            className="prose-md px-5 py-4 text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: signatureHtml }}
          />
        </section>
      )}

      {regions?.plugins}
    </div>
  )
}
