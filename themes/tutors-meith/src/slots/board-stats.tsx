import type { BoardStatsModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'

import { PANEL, PanelHead, Stamp, UserRef } from '../shared'

export function BoardStats({
  threadCount,
  postCount,
  memberCount,
  newestMember,
  computedAt,
  copy,
}: BoardStatsModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.boardStats.${key}`)

  return (
    <section aria-labelledby="board-stats-heading" className={PANEL}>
      <PanelHead id="board-stats-heading" title={c('heading')} />

      <div className="flex flex-col gap-3 px-5 py-4 text-xs text-muted-foreground">
        {computedAt === null ? (
          <p>{c('notComputed')}</p>
        ) : (
          <>
            <dl className="grid grid-cols-3 gap-2">
              {[
                { label: c('threads'), value: threadCount },
                { label: c('posts'), value: postCount },
                { label: c('members'), value: memberCount },
              ].map((figure) => (
                <div key={figure.label}>
                  <dd className="text-2xl font-semibold text-foreground tabular-nums">
                    {figure.value.label}
                  </dd>
                  <dt>{figure.label}</dt>
                </div>
              ))}
            </dl>

            {newestMember !== null && (
              <p>
                {c('newestMember')} <UserRef user={newestMember} />
              </p>
            )}

            <p className="tabular-nums">
              {c('counted')} <Stamp at={computedAt} />
            </p>
          </>
        )}
      </div>
    </section>
  )
}
