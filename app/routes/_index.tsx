import { json, type MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { reader } from '~/utils/reader'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export async function loader() {
  const posts = await reader.collections.posts.all()
  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
