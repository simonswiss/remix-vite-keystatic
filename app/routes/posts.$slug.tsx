import { json } from "@remix-run/node"
import { reader } from "../utils/reader"
import { useLoaderData } from "@remix-run/react"

import React from "react"
import { bundleMDX } from "mdx-bundler"
import { getMDXComponent } from "mdx-bundler/client"

import { Card } from "~/components/Card"
import { InlineStack } from "~/components/InlineStack"

export async function loader({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const post = await reader.collections.posts.read(slug, {
    resolveLinkedFiles: true,
  })
  if (!post) throw new Response("Post not found", { status: 404 })

  const result = await bundleMDX({ source: post.content })
  const { code } = result
  return json({ post: { ...post, mdx: code } })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()
  const MdxRenderer = React.useMemo(() => getMDXComponent(post.mdx), [post.mdx])

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedDate))

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="max-w-lg text-balance text-4xl font-semibold">
        {post.title}
      </h1>
      <p className="mt-4 text-slate-700">Posted on {formattedDate}</p>
      <div className="prose mt-12 max-w-none">
        <MdxRenderer components={{ Card, InlineStack }} />
      </div>
    </main>
  )
}
