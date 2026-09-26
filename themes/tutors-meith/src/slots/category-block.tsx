import type { CategoryBlockModel } from '@meith/theme-kit'
import { Card, CardRows } from '@meith/ui'

import { LINK } from '../shared'

export function CategoryBlock({ category, children }: CategoryBlockModel) {
  const headingId = `category-${category.id}`

  return (
    <Card aria-labelledby={headingId} className="rounded-xl">
      <div className="flex flex-col gap-0.5 border-b border-border px-5 py-4">
        <h2 id={headingId} className="text-lg font-semibold text-foreground">
          <a href={category.href} className={LINK}>
            {category.title}
          </a>
        </h2>
        {category.description !== null && (
          <p className="text-sm text-muted-foreground">{category.description}</p>
        )}
      </div>

      <CardRows>{children}</CardRows>
    </Card>
  )
}
