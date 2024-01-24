type Props = {
  gap: number
  children: React.ReactNode
}

export function InlineStack({ gap = 16, children }: Props) {
  return (
    <div className="flex flex-wrap py-4" style={{ gap }}>
      {children}
    </div>
  )
}
