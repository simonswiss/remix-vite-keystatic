import { json } from '@remix-run/node'
import { reader } from '../utils/reader'
import { useLoaderData } from '@remix-run/react'

import { MDXProvider } from '@mdx-js/react'

export async function loader({ params: { slug } }) {
  const post = await reader.collections.posts.read(slug, { resolveLinkedFiles: true })
  if (!post) throw new Response('Post not found', { status: 404 })
  return json({ post })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.publishedDate))

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Posted on {formattedDate}</p>

      <pre>{JSON.stringify(post, null, 2)}</pre>
      <MDXProvider>{post.content}</MDXProvider>
    </div>
  )
}
