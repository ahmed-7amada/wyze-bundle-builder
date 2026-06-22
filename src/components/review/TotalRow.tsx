import { formatMoney } from '../../lib/money'

interface TotalRowProps {
  activeTotal: number
  compareTotal: number
}

export default function TotalRow({ activeTotal, compareTotal }: TotalRowProps) {
  const showStrike = compareTotal > activeTotal
  return (
    <div className="flex items-baseline justify-end gap-2">
      {showStrike && (
        <span
          className="text-[18px] lg:text-[22px] xl:text-[18px] font-normal leading-[20px] tracking-[0.0025em] line-through"
          style={{ color: 'var(--color-price-strike-rev)', fontFamily: 'Gilroy-Medium, var(--font-sans)' }}
        >
          {formatMoney(compareTotal)}
        </span>
      )}
      <span
        className="text-[24px] lg:text-[28px] xl:text-[24px] font-normal leading-[32px] tracking-[-0.0013em]"
        style={{ color: 'var(--color-wyze-purple)', fontFamily: 'Gilroy-Bold, var(--font-sans)' }}
      >
        {formatMoney(activeTotal)}
      </span>
    </div>
  )
}
