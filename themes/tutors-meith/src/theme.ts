import { defaultTheme } from '@meith/theme-default'
import { defineTheme } from '@meith/theme-kit'

import { Announcement } from './slots/announcement'
import { BoardIndex } from './slots/board-index'
import { BoardStats } from './slots/board-stats'
import { CategoryBlock } from './slots/category-block'
import { Footer } from './slots/footer'
import { ForumDisplay } from './slots/forum-display'
import { ForumRow } from './slots/forum-row'
import { Header } from './slots/header'
import { LatestPosts } from './slots/latest-posts'
import { LatestThreads } from './slots/latest-threads'
import { MemberProfile } from './slots/member-profile'
import { Navigation } from './slots/navigation'
import { PostActions } from './slots/post-actions'
import { PostBit } from './slots/post-bit'
import { Shell } from './slots/shell'
import { SubforumList } from './slots/subforum-list'
import { ThreadRow } from './slots/thread-row'
import { ThreadView } from './slots/thread-view'

export const tutorsMeithTheme = defineTheme({
  key: 'tutors-meith',
  title: 'Tutors',
  version: '0.1.0',
  extends: defaultTheme,
  slots: {
    Shell,
    Header,
    Navigation,
    Footer,
    Announcement,

    BoardIndex,
    CategoryBlock,
    ForumRow,
    BoardStats,
    LatestThreads,
    LatestPosts,

    ForumDisplay,
    ThreadRow,
    SubforumList,

    ThreadView,
    PostBit,
    PostActions,

    MemberProfile,
  },
})
