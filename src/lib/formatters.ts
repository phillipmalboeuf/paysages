export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function icons(text: string) {
  const svgs = {
    'photo': '<svg width="1em" height="1em" viewBox="0 0 15 13"><rect y="2" width="15" height="11" fill="black"/><rect x="4" width="7" height="13" fill="currentColor"/><circle cx="7.5" cy="7.5" r="2.5" fill="white"/></svg>',
    'endroit': '<svg width="1em" height="1em" viewBox="0 0 13 16"><path d="M12 10L6.5 16L1 10H12Z" fill="currentColor"/><circle cx="6.5" cy="6.5" r="6.5" fill="currentColor"/><circle cx="6.5" cy="6.5" r="2.5" fill="white"/></svg>'
  }

  return Object.entries(svgs).reduce((acc, [key, value]) => {
    return acc.replaceAll(`[${key}]`, `${value}&nbsp;`)
  }, text)
}