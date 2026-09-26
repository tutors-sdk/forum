import type { BoardIndexModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'
import { buttonVariants } from '@meith/ui'

import { PAGE_BODY, PANEL } from '../shared'

export function BoardIndex({
  markAllReadAction,
  regions,
  copy,
}: BoardIndexModel & { copy: SlotCopy }) {
  const latest = regions.latest ?? null
  const rail = latest !== null || regions.stats !== null

  const c = (key: string) => fromSlotCopy(copy, `default.boardIndex.${key}`)

  return (
    <div className={PAGE_BODY}>
      {regions.announcements !== undefined && (
        <div className="flex flex-col gap-3">{regions.announcements}</div>
      )}

      <div
        className={
          rail
            ? 'grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start'
            : 'flex min-w-0 flex-col gap-5'
        }
      >
        <div className="flex min-w-0 flex-col gap-5">
          {regions.categories}
          {markAllReadAction !== null && (
            <form action={markAllReadAction} method="post" className="self-end">
              <button type="submit" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                {c('markAllRead')}
              </button>
            </form>
          )}
        </div>

        {rail && (
          <aside aria-label={c('boardActivity')} className="flex min-w-0 flex-col gap-5">
            {latest}
            {regions.stats}
          </aside>
        )}
      </div>

      {regions.online !== null && (
        <div className={`${PANEL} px-5 py-4 text-sm text-muted-foreground`}>{regions.online}</div>
      )}

      {regions.plugins}
    </div>
  )
}
