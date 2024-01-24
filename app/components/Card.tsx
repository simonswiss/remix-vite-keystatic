type CardProps = {
  image?: string
  title: string
  body: string
}

export function Card({ image, title, body }: CardProps) {
  return (
    <div className="not-prose group max-w-xs rounded-lg p-6 shadow-md ring-1 ring-black/5 has-[img]:p-0">
      {image && <img src={image} alt={title} className="rounded-t-[inherit]" />}
      <div className="group-has-[img]:p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2">{body}</p>
      </div>
    </div>
  )
}
