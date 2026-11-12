import { ArrowLeft, Search } from 'lucide-react'
import Button from '../../components/common/Button'
import { useDocumentTitle } from '../../hooks'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <section className="bg-cream pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-serif text-[6rem] leading-none text-beige sm:text-[8rem]">404</p>
          <h1 className="mt-2 text-[2.25rem] sm:text-5xl">This address doesn’t exist</h1>
          <p className="mt-4 max-w-md text-lg text-muted">The page you’re looking for may have moved, or the link might be broken. Let’s get you back on track.</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <Button to="/" iconLeft={<ArrowLeft className="h-4 w-4" />}>
              Back to home
            </Button>
            <Button to="/properties" variant="outline" iconLeft={<Search className="h-4 w-4" />}>
              Browse properties
            </Button>
          </div>
        </div>
        <img src="/images/cutout-isometric-white.webp" alt="" className="mx-auto w-full max-w-md" />
      </div>
    </section>
  )
}
