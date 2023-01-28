import { useMediaQuery } from '@studio-freight/hamo'
import cn from 'clsx'
import { Link } from 'components/link'
import s from './footer.module.scss'

export function Footer({ className, style, links }) {
  const isMobile = useMediaQuery('(max-width: 800px)')

  return (
    <footer className={cn(s.footer, 'layout-grid', className)} style={style}>
      <p className={cn(s.column, 'p-s text-muted')}>Rami Chahine</p>
      {isMobile === false && (
        <>
          <ul className={s.row}>
            {links.map((link, i) => (
              <li key={i}>
                <Link className="p-s text-muted" href={link.url}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* {isMobile === true && (
        <>
          <ul className={s.column}>
            <li className="p-s text-muted">&copy; {new Date().getFullYear()}</li>
          </ul>
          <ul className={s.column}>
            {links.slice(0, 3).map((link, i) => (
              <li key={i}>
                <Link className="p-s decorate" href={link.url}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={s.column}>
            {links.slice(3, 6).map((link, i) => (
              <li key={i}>
                <Link className="p-s decorate" href={link.url}>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )} */}

      {isMobile === false && <p className="p-s text-muted">&copy; {new Date().getFullYear()}</p>}
    </footer>
  )
}
