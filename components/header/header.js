import AlertDialog from 'components/alert-dialog'
import Link from 'next/link'

export const Header = () => {
  return (
    <header>
      <div className="font-bold mb-2 flex flex-row space-x-1">
        <Link href="/">
          <h3>Collective Creation Games</h3>
        </Link>
        <AlertDialog isOpen={true} />
      </div>
    </header>
  )
}
