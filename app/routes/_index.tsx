import { json, type MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { reader } from "~/utils/reader"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export async function loader() {
  const posts = await reader.collections.posts.all()
  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-medium">
        Remix with Vite, MDX and Keystatic
      </h1>
      <div className="mt-4">
        <p className="max-w-xl text-slate-700">
          This site is running Remix as a Vite plugin.{" "}
          <a href="https://keystatic.com" className="underline">
            Keystatic
          </a>{" "}
          is wired-up to read/write content files in the{" "}
          <code className="rounded-md bg-slate-100 px-1 text-sm">
            app/content
          </code>{" "}
          directory.
        </p>
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-medium">Posts</h2>
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.slug} className="list-inside list-disc">
              <Link to={`/posts/${post.slug}`} className="hover:underline">
                {post.entry.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
