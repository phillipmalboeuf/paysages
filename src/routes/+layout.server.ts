
import type { TypeArticleSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry, Tag } from 'contentful'

export const load = async ({ request, cookies }) => {

  const [navigations, tags, articles] = await Promise.all([
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', include: 3, locale: 'fr-CA' }),
    content.getTags(),
    content.getEntries<TypeArticleSkeleton>({ content_type: 'article', locale: 'fr-CA', order: ['-fields.date'] }),
    // content.getAsset('4pjVVDDUJ6ygWJU3UU7XT6', { locale: 'fr-CA' })
  ])

  return {
    navigations: {
      ...navigations.items.reduce((navs, nav) => {
        return {
          ...navs,
          [nav.fields.id]: nav
        }
      }, {} as {[id: string]: Entry<TypeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>}),
    },
    tags: tags.items.reduce((ts, tag) => {
      return {
        ...ts,
        [tag.sys.id]: tag
      }
    }, {} as {[id: string]: Tag}),
    articles
  }
}