/** @jsx h */
import { h } from '../tsx-runtime'

type Crumb = {
  label: string
  href?: string
  active?: boolean
}

export function Breadcrumb(props: { items: Crumb[] }) {
  return (
    <nav className="container mt-3" aria-label="breadcrumb">
      <ol className="breadcrumb shadow-sm rounded-4 bg-white p-3 mb-0 border-0">
        {props.items.map((item) => (
          <li className={`breadcrumb-item ${item.active ? 'active' : ''}`} aria-current={item.active ? 'page' : undefined}>
            {item.href && !item.active ? <a href={item.href}>{item.label}</a> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  )
}
