import type { Product } from '../../data/catalog'
import { useBundle } from '../../state/useBundle'
import Badge from './Badge'
import VariantSelector from './VariantSelector'
import QuantityStepper from './QuantityStepper'
import PriceTag from './PriceTag'

interface ProductCardProps {
  product: Product
  stepSelect: 'quantity' | 'single'
  stepProductIds: string[]
}

export default function ProductCard({ product, stepSelect, stepProductIds }: ProductCardProps) {
  const { state, dispatch } = useBundle()

  const activeVariantId = state.activeVariant[product.id] ?? product.variants[0].id
  const activeVariant = product.variants.find((v) => v.id === activeVariantId) ?? product.variants[0]
  const activeKey = `${product.id}:${activeVariantId}`
  const activeQty = state.quantities[activeKey] ?? 0

  const isSelected = product.variants.some((v) => (state.quantities[`${product.id}:${v.id}`] ?? 0) > 0)
  const hasMultipleVariants = product.variants.length > 1
  const cardImage = activeVariant.image ?? product.image

  const handlePlanClick = () => {
    dispatch({ type: 'SELECT_PLAN', key: activeKey, planProductIds: stepProductIds })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePlanClick()
    }
  }

  return (
    <div
      className="bg-white rounded-[10px] p-[11px] flex flex-col items-center gap-[13px] xl:flex-row xl:items-center xl:gap-[19px] relative"
      style={{
        border: isSelected ? '2px solid var(--color-selected-border)' : '2px solid transparent',
        cursor: stepSelect === 'single' ? 'pointer' : 'default',
      }}
      onClick={stepSelect === 'single' ? handlePlanClick : undefined}
      onKeyDown={stepSelect === 'single' ? handleKeyDown : undefined}
      role={stepSelect === 'single' ? 'radio' : undefined}
      aria-checked={stepSelect === 'single' ? isSelected : undefined}
      tabIndex={stepSelect === 'single' ? 0 : undefined}
    >
      {product.badge && (
        <div className="absolute top-[11px] left-[11px] z-10">
          <Badge text={product.badge} />
        </div>
      )}

      {/* Product image — full-width ~152px tall when stacked; 101x137 left when side-by-side */}
      <div className="rounded-[5px] bg-white flex items-center justify-center w-full h-[152px] xl:w-[101px] xl:h-[137px] xl:flex-shrink-0 overflow-hidden">
        <img
          src={cardImage}
          alt={product.title}
          className="w-full h-full object-contain rounded-[5px]"
        />
      </div>

      <div className="flex flex-col gap-[10px] w-full min-w-0 xl:w-auto xl:flex-1">
        <div className="flex flex-col gap-2">
          <h3
            className="text-[18px] xl:text-[16px] font-semibold tracking-[0.6px] leading-tight lg:max-xl:text-[16px] lg:max-xl:font-normal lg:max-xl:leading-none lg:max-xl:[font-family:Gilroy-SemiBold,var(--font-sans)] xl:font-normal xl:leading-none xl:[font-family:Gilroy-SemiBold,var(--font-sans)]"
            style={{ color: 'var(--color-text-dark)' }}
          >
            {product.title}
          </h3>
          <p className="text-[14px] xl:text-[12px] font-medium leading-[130%] lg:max-xl:font-normal lg:max-xl:tracking-[0.6px] lg:max-xl:[font-family:Gilroy-Medium,var(--font-sans)] xl:font-normal xl:tracking-[0.6px] xl:[font-family:Gilroy-Medium,var(--font-sans)]" style={{ color: 'var(--color-text-muted)' }}>
            {product.description}{' '}
            <a
              href="#"
              className="underline"
              onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
              style={{ color: 'var(--color-wyze-purple)' }}
            >
              Learn More
            </a>
          </p>
        </div>

        {hasMultipleVariants && (
          <VariantSelector
            productId={product.id}
            variants={product.variants}
            activeVariantId={activeVariantId}
          />
        )}

        {/* Stepper + price row — Frame 546: row, gap 10, Fill width.
            Below xl the stepper is taller than the single-line price, so flex-end makes
            the price sit low — center them instead. xl (side-by-side) keeps flex-end. */}
        <div className="flex flex-row items-center xl:items-end gap-[10px] w-full">
          {stepSelect === 'quantity' && (
            <QuantityStepper
              value={activeQty}
              minQty={product.minQty}
              onInc={() => dispatch({ type: 'INC', key: activeKey })}
              onDec={() => dispatch({ type: 'DEC', key: activeKey, minQty: product.minQty })}
              variant="card"
              locked={product.required === true}
            />
          )}
          <div className="ml-auto">
            <PriceTag
              price={activeVariant.price}
              compareAt={activeVariant.compareAt}
              priceType={product.priceType}
              free={activeVariant.free}
              variant="card"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
