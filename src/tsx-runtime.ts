const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
])

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/"/g, '&quot;')
}

function flattenChildren(children: unknown[]): string {
  return children
    .flat(Infinity)
    .filter((child) => child !== null && child !== undefined && child !== false)
    .map((child) => {
      if (typeof child === 'string') return child
      if (typeof child === 'number') return String(child)
      return String(child)
    })
    .join('')
}

export function Fragment(props: { children?: unknown[] }) {
  return flattenChildren(props.children ?? [])
}

export function h(
  type: string | ((props: Record<string, unknown>) => string),
  props: Record<string, unknown> | null,
  ...children: unknown[]
) {
  const normalizedProps = { ...(props ?? {}), children }

  if (typeof type === 'function') {
    return type(normalizedProps)
  }

  const attributes = Object.entries(normalizedProps)
    .filter(([key, value]) => key !== 'children' && key !== 'dangerouslySetInnerHTML' && value !== false && value !== null && value !== undefined)
    .map(([key, value]) => {
      const attr = key === 'className' ? 'class' : key
      if (value === true) {
        return attr
      }

      return `${attr}="${escapeAttribute(String(value))}"`
    })
    .join(' ')

  const dangerousHtml = typeof normalizedProps.dangerouslySetInnerHTML === 'string'
    ? normalizedProps.dangerouslySetInnerHTML
    : null
  const content = dangerousHtml ?? flattenChildren(children)
  const openTag = attributes ? `<${type} ${attributes}>` : `<${type}>`

  if (VOID_TAGS.has(type)) {
    return openTag
  }

  return `${openTag}${content}</${type}>`
}

export function renderMarkup(target: Element, markup: string) {
  target.innerHTML = markup
}
