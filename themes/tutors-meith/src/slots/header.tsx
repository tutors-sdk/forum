import { MobileHeaderNav } from '@meith/theme-default'
import type { HeaderModel, LinkModel, SlotCopy } from '@meith/theme-kit'
import { fromSlotCopy, linkTarget } from '@meith/theme-kit'

import { EYEBROW, ExternalMark } from '../shared'

const SIDE_LINK =
  'flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary'

function BoardMark({ boardTitle, logo }: Pick<HeaderModel, 'boardTitle' | 'logo'>) {
  if (logo === undefined) {
    return (
      <>
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
        >
          {(Array.from(boardTitle.trim())[0] ?? '?').toUpperCase()}_
        </span>
        <span className="truncate">{boardTitle}</span>
      </>
    )
  }

  const image = (
    <img
      src={logo.src}
      alt={logo.alt}
      className="h-8 w-auto max-w-48 object-contain"
      decoding="async"
    />
  )

  if (logo.darkSrc === null) return image

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={logo.darkSrc} />
      {image}
    </picture>
  )
}

function SideLink({ link }: { link: LinkModel }) {
  return (
    <a href={link.href} {...linkTarget(link)} className={SIDE_LINK}>
      {link.label}
      {link.newTab === true && <ExternalMark />}
    </a>
  )
}

function SideGroup({ item, first }: { item: LinkModel; first: boolean }) {
  const children = item.submenu ?? []
  return (
    <div className={first ? '' : 'mt-4 border-t border-border pt-4'}>
      <p className={`${EYEBROW} px-2 pb-1`}>
        <a href={item.href} {...linkTarget(item)} className="hover:text-primary">
          {item.label}
          {item.newTab === true && <ExternalMark />}
        </a>
      </p>
      <ul className="flex flex-col">
        {children.map((child) => (
          <li key={child.href}>
            <SideLink link={child} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Header({
  boardTitle,
  homeHref,
  navigation,
  logo,
  children,
  copy,
}: HeaderModel & { copy: SlotCopy }) {
  const c = (key: string) => fromSlotCopy(copy, `default.header.${key}`)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-card lg:-ms-60">
        <div className="flex min-h-14 items-center gap-x-3 px-4 sm:px-6">
          <a
            href={homeHref}
            className="flex min-w-0 items-center gap-2.5 text-base font-semibold text-foreground"
          >
            <BoardMark boardTitle={boardTitle} logo={logo} />
          </a>

          <div className="ms-auto flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">{children}</div>

          <MobileHeaderNav boardTitle={boardTitle} navigation={navigation} copy={copy} />
        </div>
      </header>

      {navigation.length > 0 && (
        <nav
          aria-label={c('sections')}
          className="hidden lg:fixed lg:top-14 lg:bottom-0 lg:left-0 lg:z-30 lg:block lg:w-60 lg:overflow-y-auto lg:border-r lg:border-border lg:bg-card lg:px-4 lg:py-5"
        >
          <p className={`${EYEBROW} px-2 pb-1`}>{boardTitle}</p>
          <ul data-nav-view="desktop" className="flex flex-col">
            {navigation.map((item, index) => {
              const previous = navigation[index - 1]
              const grouped = item.submenu !== undefined && item.submenu.length > 0
              const separated =
                previous !== undefined && (previous.group ?? '') !== (item.group ?? '')
              return (
                <li key={item.href} className={separated ? 'mt-4 border-t border-border pt-4' : ''}>
                  {grouped ? <SideGroup item={item} first={separated} /> : <SideLink link={item} />}
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </>
  )
}
