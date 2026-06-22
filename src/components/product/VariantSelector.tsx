import type { Variant } from '../../data/catalog'
import { useBundle } from '../../state/useBundle'

interface VariantSelectorProps {
  productId: string
  variants: Variant[]
  activeVariantId: string
}

export default function VariantSelector({ productId, variants, activeVariantId }: VariantSelectorProps) {
  const { dispatch } = useBundle()

  return (
    <div className="flex flex-wrap gap-[6px]">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId
        return (
          <button
            key={variant.id}
            onClick={() =>
              dispatch({ type: 'SET_ACTIVE_VARIANT', productId, variantId: variant.id })
            }
            className="flex items-center justify-center gap-[3px] px-[3px] py-[1px] min-w-[62px] rounded-[2px] text-[10px] font-medium"
            style={{
              color: 'var(--color-text-dark)',
              border: isActive
                ? '0.5px solid var(--color-green)'
                : '0.5px solid var(--color-chip-border)',
              backgroundColor: isActive ? 'var(--color-green-bg-faint)' : '#FFFFFF',
            }}
            aria-pressed={isActive}
            aria-label={`Select ${variant.label}`}
          >
            {variant.image ? (
              <img
                src={variant.image}
                alt={variant.label}
                className="w-[24px] h-[24px] rounded-[5px] flex-shrink-0 object-contain"
              />
            ) : variant.swatch ? (
              <span
                className="inline-block w-[24px] h-[24px] rounded-[5px] flex-shrink-0"
                style={{
                  backgroundColor: variant.swatch,
                  border: variant.swatch === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                }}
              />
            ) : null}
            {variant.label}
          </button>
        )
      })}
    </div>
  )
}
