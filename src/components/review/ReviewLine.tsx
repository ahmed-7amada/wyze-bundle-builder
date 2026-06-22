import { useBundle } from '../../state/useBundle'
import QuantityStepper from '../product/QuantityStepper'
import PriceTag from '../product/PriceTag'

interface ReviewLineProps {
  productId: string
  variantId: string
  qty: number
  index: number
}

export default function ReviewLine({ productId, variantId, qty, index }: ReviewLineProps) {
  const { dispatch, productMap } = useBundle()

  const product = productMap[productId]
  if (!product) return null

  const variant = product.variants.find((v) => v.id === variantId)
  if (!variant) return null

  const key = `${productId}:${variantId}`
  const isPlan = product.priceType === 'monthly'
  const isLocked = product.required === true

  return (
    <div
      className={`flex items-center py-3 ${isPlan ? 'gap-[6px] sm:gap-3 lg:max-xl:gap-[6px]' : 'gap-3'}`}
      style={{
        borderTop: index === 0 ? 'none' : '1px solid var(--color-divider)',
        ...(isPlan ? { borderBottom: '1px solid var(--color-divider)' } : {}),
      }}
    >
      {/* Thumbnail — plan uses small inline logo; products use 41×41 box */}
      {isPlan ? (
        <img
          src={product.image}
          alt={product.title}
          className="flex-shrink-0 object-contain w-[14px] h-[17px] sm:w-[26px] sm:h-[31px] xl:w-[20px] xl:h-[24px]"
        />
      ) : (
        <div className="w-[41px] h-[41px] rounded-[5px] flex-shrink-0 overflow-hidden">
          <img
            src={variant.image ?? product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-[5px]"
          />
        </div>
      )}

      {/* Name — "Cam Unlimited" (plan) is Bold 16px #000; others Medium 14px --obsidian */}
      <div className="flex-1 min-w-0">
        <p className={isPlan ? 'text-[14px] sm:text-[16px] font-bold truncate lg:max-xl:text-[20px] lg:max-xl:font-normal lg:max-xl:leading-none lg:max-xl:tracking-[-0.002em] lg:max-xl:[font-family:Gilroy-Bold,var(--font-sans)] xl:text-[16px] xl:font-normal xl:leading-none xl:tracking-[-0.002em] xl:[font-family:Gilroy-Bold,var(--font-sans)]' :'text-[12px] sm:text-[14px] font-medium truncate lg:max-xl:text-[18px] lg:max-xl:font-normal lg:max-xl:leading-[16px] lg:max-xl:tracking-[0.005em] lg:max-xl:[font-family:Gilroy-Medium,var(--font-sans)] xl:text-[14px] xl:font-normal xl:leading-[16px] xl:tracking-[0.005em] xl:[font-family:Gilroy-Medium,var(--font-sans)]'}>
          {isPlan ? (
            <span className="inline-flex items-center gap-[3px] align-middle">
              <span style={{ color: '#000000' }}>{product.title.slice(0, product.title.lastIndexOf(' '))}</span>
              <span style={{ color: 'var(--color-wyze-purple)' }}>{product.title.slice(product.title.lastIndexOf(' ') + 1)}</span>
            </span>
          ) : (
            <span style={{ color: 'var(--color-obsidian)' }}>
              {product.title}{variant.id !== 'default' && ` — ${variant.label}`}
            </span>
          )}
        </p>
      </div>

      {/* Stepper — not shown for plan */}
      {!isPlan && (
        <QuantityStepper
          value={qty}
          minQty={product.minQty}
          onInc={() => dispatch({ type: 'INC', key })}
          onDec={() => dispatch({ type: 'DEC', key, minQty: product.minQty })}
          variant="review"
          locked={isLocked}
        />
      )}

      {/* Price (unit × qty for quantity lines; unit for plan) */}
      <PriceTag
        price={variant.price}
        compareAt={variant.compareAt}
        priceType={product.priceType}
        qty={isPlan ? 1 : qty}
        free={variant.free}
        variant="review"
      />
    </div>
  )
}
