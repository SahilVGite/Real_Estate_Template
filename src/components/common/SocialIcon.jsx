/** Brand icons (Lucide v1 no longer ships them). Simple, single-colour glyphs. */
const paths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </>
  ),
  facebook: <path fill="currentColor" d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.3a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.2H7.7v3h2.6V21h3.2Z" />,
  linkedin: (
    <path
      fill="currentColor"
      d="M6.9 8.6H3.7V20h3.2V8.6ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.3 13.4c0-3.1-1.7-4.9-4.3-4.9-1.6 0-2.6.8-3.1 1.6V8.6H9.8V20H13v-5.8c0-1.5.6-2.6 2-2.6 1.3 0 1.9 1 1.9 2.6V20h3.3v-6.6Z"
    />
  ),
  x: <path fill="currentColor" d="M17.3 3.5h3l-6.5 7.4 7.7 9.6h-6l-4.7-6-5.4 6h-3l7-7.9-7.4-9.1h6.1l4.2 5.5 5-5.5Zm-1 15.2h1.7L7.8 5.2H6l10.3 13.5Z" />,
  youtube: (
    <path
      fill="currentColor"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
    />
  ),
}

export default function SocialIcon({ name, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {paths[name]}
    </svg>
  )
}
