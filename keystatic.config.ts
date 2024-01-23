import { collection, config, fields } from '@keystatic/core'
import { __experimental_mdx_field } from '@keystatic/core/form/fields/markdoc'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      path: 'app/content/posts/*',
      slugField: 'title',
      format: {
        contentField: 'content',
      },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({ label: 'Published Date', validation: { isRequired: true } }),
        content: __experimental_mdx_field({
          label: 'Content',
        }),
      },
    }),
  },
})
