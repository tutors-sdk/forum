import type { NavigationModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy } from '@meith/theme-kit'

import { ACTION_LINK, PAGE } from '../shared'

export function Navigation({ items, copy }: NavigationModel & { copy: SlotCopy }) {
  if (items.length === 0) return null

  const c = (key: string) => fromSlotCopy(copy, `default.navigation.${key}`)

  return (
    <nav aria-label={c('breadcrumb')} className={`${PAGE} pt-4`}>
      <ol className="flex flex-wrap items-center gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <span aria-hidden="true" className="px-2 text-muted-foreground select-none">
                  {c('separator')}
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-muted-foreground">
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className={ACTION_LINK}>
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
