import { collection, config, fields } from "@keystatic/core"
import { block, wrapper } from "@keystatic/core/content-components"
import { __experimental_mdx_field } from "@keystatic/core/form/fields/markdoc"
import { bookImageIcon } from "@keystar/ui/icon/icons/bookImageIcon"

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      path: "app/content/posts/*",
      slugField: "title",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedDate: fields.date({
          label: "Published Date",
          validation: { isRequired: true },
        }),
        content: __experimental_mdx_field({
          label: "Content",
          components: {
            Card: block({
              label: "Card",
              description:
                "Demo card component, using a 'block' content component.",
              icon: bookImageIcon,
              schema: {
                image: fields.image({
                  label: "Image",
                  directory: "public/images/posts",
                  publicPath: "/images/posts",
                }),
                title: fields.text({ label: "Title" }),
                body: fields.text({ label: "Body", multiline: true }),
              },
            }),

            InlineStack: wrapper({
              label: "Inline Stack",
              icon: bookImageIcon,
              description:
                "Demo inline stack component, using a 'wrapper' content component.",
              schema: {
                gap: fields.integer({
                  label: "Gap",
                  description: "A pixel value for the gap between elements",
                }),
              },
            }),
          },
        }),
      },
    }),
  },
})
