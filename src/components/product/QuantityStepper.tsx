interface QuantityStepperProps {
  value: number
  minQty: number
  onInc: () => void
  onDec: () => void
  variant?: 'card' | 'review'
  locked?: boolean
}

export default function QuantityStepper({
  value,
  minQty,
  onInc,
  onDec,
  variant = 'card',
  locked = false,
}: QuantityStepperProps) {
  const atMin = value <= minQty
  const decDisabled = locked || atMin
  const incDisabled = locked

  if (variant === 'review') {
    return (
      <div className="flex items-center justify-between w-[72px] flex-shrink-0 px-1 py-1 rounded-[4px]">
        <button
          onClick={onDec}
          disabled={decDisabled}
          className="w-5 h-5 rounded-[4px] flex items-center justify-center text-sm leading-none"
          style={{
            backgroundColor: decDisabled ? 'var(--color-btn-disabled-bg)' : 'var(--color-btn-rev-bg)',
            border: '1px solid var(--color-divider)',
            color: decDisabled ? 'var(--color-btn-icon-light)' : 'var(--color-btn-rev-icon)',
            cursor: decDisabled ? 'default' : 'pointer',
          }}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span
          className="text-[14px] font-semibold select-none lg:max-xl:font-normal lg:max-xl:leading-[16px] lg:max-xl:[font-family:Gilroy-SemiBold,var(--font-sans)] xl:font-normal xl:leading-[16px] xl:[font-family:Gilroy-SemiBold,var(--font-sans)]"
          style={{ color: 'var(--color-obsidian)' }}
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
        </span>
        <button
          onClick={onInc}
          disabled={incDisabled}
          className="w-5 h-5 rounded-[4px] flex items-center justify-center text-sm leading-none"
          style={{
            backgroundColor: incDisabled ? 'var(--color-btn-disabled-bg)' : 'var(--color-btn-rev-bg)',
            border: '1px solid var(--color-divider)',
            color: incDisabled ? 'var(--color-btn-icon-light)' : 'var(--color-btn-rev-icon)',
            cursor: incDisabled ? 'default' : 'pointer',
          }}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-[10px] py-1">
      <button
        onClick={onDec}
        disabled={decDisabled}
        className="w-5 h-5 rounded-[4px] flex items-center justify-center text-sm leading-none"
        style={{
          backgroundColor: decDisabled ? '#FFFFFF' : 'var(--color-btn-light-bg)',
          border: decDisabled ? '2px solid var(--color-btn-border-light)' : 'none',
          color: decDisabled ? 'var(--color-btn-icon-light)' : 'var(--color-btn-icon-dark)',
          cursor: decDisabled ? 'default' : 'pointer',
        }}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className="text-[16px] font-medium select-none min-w-[20px] text-center lg:max-xl:font-normal lg:max-xl:leading-[20px] lg:max-xl:[font-family:Gilroy-Medium,var(--font-sans)] xl:font-normal xl:leading-[20px] xl:[font-family:Gilroy-Medium,var(--font-sans)]"
        style={{ color: 'var(--color-obsidian)' }}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        onClick={onInc}
        disabled={incDisabled}
        className="w-5 h-5 rounded-[4px] flex items-center justify-center text-sm leading-none"
        style={{
          backgroundColor: incDisabled ? '#FFFFFF' : 'var(--color-btn-light-bg)',
          border: incDisabled ? '2px solid var(--color-btn-border-light)' : 'none',
          color: incDisabled ? 'var(--color-btn-icon-light)' : 'var(--color-btn-icon-dark)',
          cursor: incDisabled ? 'default' : 'pointer',
        }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
