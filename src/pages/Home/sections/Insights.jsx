import { useState } from 'react'
import { ArrowUpRight, Clock } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'
import Modal from '../../../components/common/Modal'
import Button from '../../../components/common/Button'
import { posts } from '../../../data/blog'
import { cn, formatDate } from '../../../utils/format'
import { useLead } from '../../../context/LeadContext'

export default function Insights() {
  const [open, setOpen] = useState(null)
  const { openLead } = useLead()

  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="insights-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Latest insights"
          title={<span id="insights-heading">Guides & market notes</span>}
          description="Practical advice from our advisors on buying, renting and investing in property."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-[1.35fr_1fr] lg:grid-rows-2 lg:gap-8">
          {posts.map((post, i) => {
            const lead = i === 0
            return (
              <Reveal key={post.id} delay={i * 0.08} className={cn(lead && 'md:col-span-2 lg:col-span-1 lg:row-span-2')}>
                <button
                  onClick={() => setOpen(post)}
                  className={cn('group flex h-full w-full text-left', lead ? 'flex-col' : 'flex-col gap-5 sm:flex-row lg:items-center')}
                >
                  <div className={cn('relative shrink-0 overflow-hidden rounded-lg', lead ? 'aspect-[16/10] w-full' : 'aspect-[16/10] w-full sm:aspect-[4/3] sm:w-[44%]')}>
                    <img src={post.image} alt="" loading="lazy" className="img-cover transition duration-700 ease-out-soft group-hover:scale-[1.05]" />
                  </div>
                  <div className={cn('flex flex-col', lead && 'pt-6')}>
                    <div className="flex items-center gap-3 text-[0.8125rem] text-muted">
                      <span className="font-semibold tracking-[0.12em] text-gold-dark uppercase">{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-line" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className={cn('mt-2.5 leading-snug transition group-hover:text-gold-dark', lead ? 'text-[1.6rem] sm:text-[1.875rem]' : 'text-[1.25rem]')}>{post.title}</h3>
                    {lead && <p className="mt-3 text-muted">{post.excerpt}</p>}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                      Read article <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title} size="lg">
        {open && (
          <article>
            <div className="-mt-2 mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span className="font-semibold text-gold-dark">{open.category}</span>
              <span>By {open.author}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {open.readTime} min read
              </span>
            </div>
            <div className="mb-6 aspect-[16/9] overflow-hidden rounded-lg">
              <img src={open.image} alt="" className="img-cover" />
            </div>
            <div className="space-y-4 leading-relaxed text-ink/90">
              {open.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
              <Button
                onClick={() => {
                  setOpen(null)
                  openLead('callback', { source: `article:${open.slug}` })
                }}
              >
                Ask an advisor
              </Button>
              <Button variant="outline" onClick={() => setOpen(null)}>
                Close
              </Button>
            </div>
          </article>
        )}
      </Modal>
    </section>
  )
}
