import Link from 'next/link'

export const Header = () => {
  return (
    <header>
      <div className="font-bold mb-2">
        <Link href="/">
          <h3>Collective Creation Games</h3>
        </Link>
      </div>
    </header>
  )
}
