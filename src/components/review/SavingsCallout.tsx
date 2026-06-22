import { formatMoney } from '../../lib/money'

interface SavingsCalloutProps {
  savings: number
}

export default function SavingsCallout({ savings }: SavingsCalloutProps) {
  if (savings <= 0) return null
  return (
    <p
      className="text-center text-[12px] lg:text-[14px] xl:text-[12px] font-semibold leading-none tracking-[-0.06px] py-1 lg:max-xl:font-normal lg:max-xl:[font-family:Gilroy-SemiBold,var(--font-sans)] xl:font-normal xl:[font-family:Gilroy-SemiBold,var(--font-sans)]"
      style={{ color: 'var(--color-green)' }}
    >
      Congrats! You're saving {formatMoney(savings)} on your security bundle!
    </p>
  )
}
