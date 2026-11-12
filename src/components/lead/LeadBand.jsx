import { ClipboardList, PhoneCall } from 'lucide-react'
import Button from '../common/Button'
import { useLead } from '../../context/LeadContext'
import { agents } from '../../data/agents'
import { cn } from '../../utils/format'

/** Compact inline call-to-action that opens lead popups. */
export default function LeadBand({ title = 'Can’t find what you’re looking for?', text = 'Share your requirement and our advisors will send a hand-picked shortlist within 24 hours — including homes not yet listed online.', source = 'lead-band', className }) {
  const { openLead } = useLead()
  return (
    <div className={cn('flex flex-col gap-6 rounded-lg bg-navy p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between', className)}>
      <div className="flex items-start gap-5">
        <div className="hidden shrink-0 -space-x-3 sm:flex">
          {agents.slice(0, 3).map((a) => (
            <img key={a.id} src={a.photo} alt="" className="h-12 w-12 rounded-full border-2 border-navy object-cover" />
          ))}
        </div>
        <div>
          <h3 className="font-serif text-[1.5rem] leading-snug text-white">{title}</h3>
          <p className="mt-1.5 max-w-xl text-sm text-white/70">{text}</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-2 xs:flex-row">
        <Button variant="gold" onClick={() => openLead('requirement', { source })} iconLeft={<ClipboardList className="h-4 w-4" />}>
          Post requirement
        </Button>
        <Button variant="outline-light" onClick={() => openLead('callback', { source })} iconLeft={<PhoneCall className="h-4 w-4" />}>
          Get a callback
        </Button>
      </div>
    </div>
  )
}
