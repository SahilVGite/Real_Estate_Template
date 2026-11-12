import { useMemo, useState } from 'react'
import { Landmark } from 'lucide-react'
import Button from '../../components/common/Button'
import { formatCompactPrice, formatNumber } from '../../utils/format'

function Slider({ label, value, display, min, max, step, onChange }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-medium text-ink tabular-nums">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-navy"
      />
    </label>
  )
}

/** Indicative home-loan EMI estimate. Standard reducing-balance formula. */
export default function EmiCalculator({ price, onLoanHelp }) {
  const [downPct, setDownPct] = useState(20)
  const [rate, setRate] = useState(8.5)
  const [years, setYears] = useState(20)

  const { loan, emi, interest, total } = useMemo(() => {
    const loanAmt = price * (1 - downPct / 100)
    const r = rate / 12 / 100
    const n = years * 12
    const e = r === 0 ? loanAmt / n : (loanAmt * r * (1 + r) ** n) / ((1 + r) ** n - 1)
    return { loan: loanAmt, emi: e, total: e * n, interest: e * n - loanAmt }
  }, [price, downPct, rate, years])

  const interestShare = total > 0 ? (interest / total) * 100 : 0

  return (
    <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        <Slider label="Down payment" value={downPct} min={10} max={60} step={5} onChange={setDownPct} display={`${downPct}% · ${formatCompactPrice(price * (downPct / 100))}`} />
        <Slider label="Interest rate" value={rate} min={7} max={12} step={0.1} onChange={setRate} display={`${rate.toFixed(1)}% p.a.`} />
        <Slider label="Loan tenure" value={years} min={5} max={30} step={1} onChange={setYears} display={`${years} years`} />
        <p className="text-xs text-muted">Indicative estimate only. Actual rates depend on the lender and your eligibility.</p>
      </div>
      <div className="rounded-lg bg-cream p-6">
        <p className="text-sm text-muted">Estimated monthly EMI</p>
        <p className="mt-1 font-serif text-[2.4rem] leading-none text-navy">₹{formatNumber(Math.round(emi))}</p>
        <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-gold/30" aria-hidden>
          <div className="bg-navy" style={{ width: `${100 - interestShare}%` }} />
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="flex items-center gap-2 text-muted">
              <span className="h-2 w-2 rounded-full bg-navy" /> Loan amount
            </dt>
            <dd className="font-medium tabular-nums">{formatCompactPrice(Math.round(loan))}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="flex items-center gap-2 text-muted">
              <span className="h-2 w-2 rounded-full bg-gold/60" /> Total interest
            </dt>
            <dd className="font-medium tabular-nums">{formatCompactPrice(Math.round(interest))}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-2">
            <dt className="text-muted">Total payable</dt>
            <dd className="font-medium tabular-nums">{formatCompactPrice(Math.round(total))}</dd>
          </div>
        </dl>
        <Button variant="outline" size="sm" className="mt-5 w-full bg-white" iconLeft={<Landmark className="h-4 w-4" />} onClick={onLoanHelp}>
          Check my loan eligibility
        </Button>
      </div>
    </div>
  )
}
