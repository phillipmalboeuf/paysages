export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function icons(text: string) {
  const svgs = {
    'photo': '<svg width="1em" height="1em" viewBox="0 0 16 14"><path d="M11.2234 2.52836V0.5H4.03461V2.52836H0V13.5H15.2579V2.52836H11.2234ZM7.62904 10.4445C6.28681 10.4445 5.19863 9.35641 5.19863 8.0141C5.19863 6.67179 6.28673 5.58369 7.62904 5.58369C8.97135 5.58369 10.0595 6.67179 10.0595 8.0141C10.0595 9.35641 8.97135 10.4445 7.62904 10.4445Z" fill="currentColor"/></svg>',
    'endroit': '<svg width="1em" height="1em" viewBox="0 0 12 16"><path d="M5.99996 0.5C2.68625 0.5 0 3.18632 0 6.49996C0 9.86628 3.15798 12.5399 5.99996 15.4717C9.07827 12.405 11.9999 9.82308 11.9999 6.49996C11.9999 3.17684 9.31368 0.5 5.99996 0.5ZM5.99996 8.84706C4.74289 8.84706 3.72374 7.82799 3.72374 6.57084C3.72374 5.31369 4.74281 4.29462 5.99996 4.29462C7.25711 4.29462 8.27618 5.31369 8.27618 6.57084C8.27618 7.82799 7.25711 8.84706 5.99996 8.84706Z" fill="currentColor"/></svg>'
  }

  return Object.entries(svgs).reduce((acc, [key, value]) => {
    return acc.replaceAll(`[${key}]`, `${value}&nbsp;`)
  }, text)
}