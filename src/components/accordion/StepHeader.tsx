import type { Step } from '../../data/catalog'
import { useBundle } from '../../state/useBundle'

interface StepHeaderProps {
  step: Step
  stepIndex: number
  totalSteps: number
  isOpen: boolean
  onToggle: () => void
}

export default function StepHeader({ step, stepIndex, totalSteps, isOpen, onToggle }: StepHeaderProps) {
  const { state, productMap } = useBundle()

  const stepProducts = step.products.map((id) => productMap[id]).filter(Boolean)
  const selectedCount = stepProducts.filter((product) =>
    product.variants.some((v) => (state.quantities[`${product.id}:${v.id}`] ?? 0) > 0)
  ).length

  return (
    <button
      className="w-full text-left"
      onClick={onToggle}
      aria-expanded={isOpen}
      style={undefined}
    >
      {/* Step label — sits above the bordered frame */}
      <span
        className="text-[10px] lg:text-[12px] font-normal leading-none tracking-[1.6px] uppercase block px-[15px] py-2 lg:pt-3"
        style={{ color: 'var(--color-label-gray)', fontFamily: 'Gilroy-Medium, var(--font-sans)' }}
      >
        STEP {stepIndex + 1} OF {totalSteps}
      </span>

      {/* Icon row — border-top + border-bottom per Figma Frame 25 */}
      <div
        className="flex items-center gap-[3px] px-[15px] py-5"
        style={{
          borderTop: '0.5px solid var(--color-divider-step)',
          ...(isOpen ? {} : { borderBottom: '0.5px solid var(--color-divider-step)' }),
        }}
      >
        <img
          src={step.icon}
          alt=""
          className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] object-contain flex-shrink-0"
        />
        <span
          className="text-[18px] lg:text-[22px] font-normal flex-1 leading-none tracking-[0px]"
          style={{ color: 'var(--color-obsidian)', fontFamily: 'Gilroy-SemiBold, var(--font-sans)' }}
        >
          {step.title}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isOpen && selectedCount > 0 && (
            <span
              className="text-[14px] font-normal leading-[16px] tracking-[0px] text-center [font-family:Gilroy-Medium,var(--font-sans)]"
              style={{ color: 'var(--color-wyze-purple)' }}
            >
              {selectedCount} selected
            </span>
          )}
          {isOpen ? (
            <img src="/images/icons/top arrow.png" alt="" className="w-[18px] h-[18px] xl:w-[12px] xl:h-[12px] object-contain" />
          ) : (
            <img src="/images/icons/bottom arrow.png" alt="" className="w-[18px] h-[18px] xl:w-[12px] xl:h-[12px] object-contain" />
          )}
        </div>
      </div>
    </button>
  )
}
