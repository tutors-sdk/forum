import type {
  CountModel,
  GroupTagModel,
  PrefixModel,
  TimeModel,
  UserRefModel,
} from '@meith/theme-kit'
import { Badge, type BadgeVariants, cn } from '@meith/ui'

export const PAGE = 'mx-auto w-full max-w-6xl px-4 sm:px-6'

export const PAGE_BODY = `${PAGE} flex w-full flex-col gap-6 py-6 sm:py-8`

export const LINK = 'underline-offset-4 decoration-2 hover:underline'

export const ACTION_LINK = `text-primary hover:text-primary-hover ${LINK}`

export const EYEBROW = 'text-xs font-semibold tracking-wide text-muted-foreground uppercase'

export const H1 = 'text-3xl font-semibold tracking-tight text-foreground text-balance'

export const LEAD = 'max-w-prose text-lg leading-relaxed text-muted-foreground'

export const ROW =
  'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 px-4 py-4 transition-colors hover:bg-muted/50 sm:px-5'

export const META = 'mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground'

export const CHIP =
  'inline-flex max-w-full items-center truncate rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground'

export const PANEL = 'overflow-hidden rounded-xl border border-border bg-card'

const PREFIX_TONES: Record<string, NonNullable<BadgeVariants['tone']>> = {
  'thread-pinned': 'pinned',
  'thread-locked': 'locked',
  'thread-moved': 'moved',
  'thread-unapproved': 'unapproved',
  'thread-deleted': 'deleted',
  'moderation-pending': 'pending',
  'moderation-approved': 'approved',
  'moderation-rejected': 'rejected',
  'group-admin': 'admin',
  'group-supermod': 'supermod',
  'group-mod': 'mod',
  'group-banned': 'banned',
}

export function Prefix({ prefix }: { prefix: PrefixModel }) {
  const tone = prefix.token === null ? 'neutral' : (PREFIX_TONES[prefix.token] ?? 'neutral')
  return <Badge tone={tone}>{prefix.label}</Badge>
}

export function UserRef({ user, className }: { user: UserRefModel; className?: string }) {
  const classes = cn(
    'font-medium',
    user.nameClass == null && 'text-foreground',
    className,
    user.nameClass,
  )
  if (user.profileHref === null) return <span className={classes}>{user.username}</span>
  return (
    <a href={user.profileHref} className={cn(LINK, classes)}>
      {user.username}
    </a>
  )
}

export function Stamp({ at }: { at: TimeModel }) {
  return <time dateTime={at.iso}>{at.label}</time>
}

export function Count({ value, one, many }: { value: CountModel; one: string; many: string }) {
  return (
    <span className="whitespace-nowrap">
      <span className="font-semibold text-foreground tabular-nums">{value.label}</span>{' '}
      {value.value === 1 ? one : many}
    </span>
  )
}

export function ExternalMark() {
  return (
    <span aria-hidden="true" className="ms-1">
      ↗
    </span>
  )
}

export function Arrow() {
  return (
    <span aria-hidden="true" className="text-lg leading-none text-primary">
      →
    </span>
  )
}

export function Tile({ label, className }: { label: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-sm font-semibold text-primary select-none',
        className,
      )}
    >
      {(Array.from(label.trim())[0] ?? '?').toUpperCase()}
    </span>
  )
}

export function PanelHead({
  id,
  title,
  aside,
}: {
  id: string
  title: string
  aside?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-3">
      <h2 id={id} className={EYEBROW}>
        {title}
      </h2>
      {aside}
    </div>
  )
}

export function groupTags(
  groups: readonly GroupTagModel[] | undefined,
  title: string | null,
): readonly GroupTagModel[] {
  if (groups !== undefined && groups.length > 0) return groups
  return title === null ? [] : [{ title }]
}

export function isEmptyRegion(node: React.ReactNode): boolean {
  if (node === null || node === undefined || node === false || node === '') return true
  return Array.isArray(node) && node.every((child) => isEmptyRegion(child))
}
