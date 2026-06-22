import ReviewLine from './ReviewLine'

interface ReviewGroupProps {
  groupName: string
  items: Array<{ productId: string; variantId: string; qty: number }>
}

export default function ReviewGroup({ groupName, items }: ReviewGroupProps) {
  if (items.length === 0) return null

  return (
    <div className="pt-[15px]" style={{ borderTop: '1px solid var(--color-divider)' }}>
      <p
        className="text-[12px] uppercase tracking-[0.03em] mb-1 lg:max-xl:font-normal lg:max-xl:leading-[16px] lg:max-xl:[font-family:Gilroy-Regular,var(--font-sans)] xl:font-normal xl:leading-[16px] xl:[font-family:Gilroy-Regular,var(--font-sans)]"
        style={{ color: 'var(--color-subhead-gray)' }}
      >
        {groupName === 'Plan' ? (
          <>
            <span className="sm:hidden">Home monitoring plan</span>
            <span className="hidden sm:inline">Plan</span>
          </>
        ) : (
          groupName
        )}
      </p>
      {items.map(({ productId, variantId, qty }, index) => (
        <ReviewLine key={`${productId}:${variantId}`} productId={productId} variantId={variantId} qty={qty} index={index} />
      ))}
    </div>
  )
}
