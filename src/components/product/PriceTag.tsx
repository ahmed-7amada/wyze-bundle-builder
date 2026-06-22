import { formatMoney } from '../../lib/money'

interface PriceTagProps {
  price: number
  compareAt: number
  priceType?: 'onetime' | 'monthly'
  qty?: number
  free?: boolean
  variant?: 'card' | 'review'
}

export default function PriceTag({
  price,
  compareAt,
  priceType = 'onetime',
  qty = 1,
  free,
  variant = 'card',
}: PriceTagProps) {
  const activeAmount = price * qty
  const compareAmount = compareAt * qty
  const suffix = priceType === 'monthly' ? '/mo' : ''
  const showStrike = compareAt > price

  if (free || price === 0) {
    if (variant === 'review') {
      return (
        <div className="flex flex-col items-end leading-tight lg:max-xl:flex-row lg:max-xl:items-center lg:max-xl:gap-[6px]">
          {showStrike && (
            <span
              className="line-through text-[12px] sm:text-[14px] font-normal lg:max-xl:text-[16px] lg:max-xl:leading-[16px] lg:max-xl:tracking-[0.005em]"
              style={{ color: 'var(--color-price-strike-rev)', fontFamily: 'Gilroy-Medium, var(--font-sans)' }}
            >
              {formatMoney(compareAmount)}{suffix}
            </span>
          )}
          <span
            className="text-[12px] sm:text-[14px] font-normal lg:max-xl:text-[16px] lg:max-xl:leading-[16px] lg:max-xl:tracking-[0.005em]"
            style={{ color: 'var(--color-wyze-purple)', fontFamily: 'Gilroy-SemiBold, var(--font-sans)' }}
          >
            FREE
          </span>
        </div>
      )
    }
    return (
      <div className="flex flex-col sm:flex-row xl:flex-col items-end sm:items-baseline xl:items-end gap-[3px] sm:gap-[6px] xl:gap-[3px] leading-none">
        {showStrike && (
          <span
            className="line-through text-[16px] lg:max-xl:font-normal lg:max-xl:leading-none lg:max-xl:tracking-[0.6px] lg:max-xl:[font-family:Gilroy-Regular,var(--font-sans)] xl:font-normal xl:leading-none xl:tracking-[0.6px] xl:[font-family:Gilroy-Regular,var(--font-sans)]"
            style={{ color: 'var(--color-price-strike-card)' }}
          >
            {formatMoney(compareAmount)}
          </span>
        )}
        <span className="text-[16px] lg:max-xl:font-normal lg:max-xl:leading-none lg:max-xl:tracking-[0.6px] lg:max-xl:[font-family:Gilroy-Regular,var(--font-sans)] xl:font-normal xl:leading-none xl:tracking-[0.6px] xl:[font-family:Gilroy-Regular,var(--font-sans)]" style={{ color: 'var(--color-price-active-card)' }}>
          FREE
        </span>
      </div>
    )
  }

  if (variant === 'review') {
    return (
      <div className="flex flex-col items-end leading-tight lg:max-xl:flex-row lg:max-xl:items-center lg:max-xl:gap-[6px]">
        {showStrike && (
          <span
            className="line-through text-[12px] sm:text-[14px] font-normal lg:max-xl:text-[16px] lg:max-xl:leading-[16px] lg:max-xl:tracking-[0.005em] xl:leading-[16px] xl:tracking-[0.005em]"
            style={{ color: 'var(--color-price-strike-rev)', fontFamily: 'Gilroy-Medium, var(--font-sans)' }}
          >
            {formatMoney(compareAmount)}{suffix}
          </span>
        )}
        <span
          className="text-[12px] sm:text-[14px] font-normal lg:max-xl:text-[16px] lg:max-xl:leading-[16px] lg:max-xl:tracking-[0.005em] xl:leading-[16px] xl:tracking-[0.005em]"
          style={{ color: 'var(--color-wyze-purple)', fontFamily: 'Gilroy-SemiBold, var(--font-sans)' }}
        >
          {formatMoney(activeAmount)}{suffix}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row xl:flex-col items-end sm:items-baseline xl:items-end gap-[3px] sm:gap-[6px] xl:gap-[3px] leading-none">
      {showStrike && (
        <span
          className="line-through text-[16px] lg:max-xl:font-normal lg:max-xl:leading-none lg:max-xl:tracking-[0.6px] lg:max-xl:[font-family:Gilroy-Regular,var(--font-sans)] xl:font-normal xl:leading-none xl:tracking-[0.6px] xl:[font-family:Gilroy-Regular,var(--font-sans)]"
          style={{ color: 'var(--color-price-strike-card)' }}
        >
          {formatMoney(compareAmount)}{suffix}
        </span>
      )}
      <span className="text-[16px] lg:max-xl:font-normal lg:max-xl:leading-none lg:max-xl:tracking-[0.6px] lg:max-xl:[font-family:Gilroy-Regular,var(--font-sans)] xl:font-normal xl:leading-none xl:tracking-[0.6px] xl:[font-family:Gilroy-Regular,var(--font-sans)]" style={{ color: 'var(--color-price-active-card)' }}>
        {formatMoney(activeAmount)}{suffix}
      </span>
    </div>
  )
}
