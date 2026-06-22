import { useMemo } from 'react'
import { catalog } from '../../data/catalog'
import { useBundle } from '../../state/useBundle'
import { computeTotals } from '../../lib/pricing'
import ReviewGroup from './ReviewGroup'
import ShippingRow from './ShippingRow'
import GuaranteeBadge from './GuaranteeBadge'
import FinancingLine from './FinancingLine'
import TotalRow from './TotalRow'
import SavingsCallout from './SavingsCallout'
import CheckoutButton from './CheckoutButton'
import SaveLink from './SaveLink'

// Canonical display order for review groups
const GROUP_ORDER = ['Cameras', 'Sensors', 'Accessories', 'Plan']

// Build productId → reviewGroup map from catalog
const productGroupMap: Record<string, string> = {}
for (const step of catalog.steps) {
  for (const productId of step.products) {
    productGroupMap[productId] = step.reviewGroup
  }
}

export default function ReviewPanel() {
  const { state, variantLookup } = useBundle()

  // Collect all items with qty > 0
  const activeItems = useMemo(() => {
    return Object.entries(state.quantities)
      .filter(([, qty]) => qty > 0)
      .map(([key, qty]) => {
        const [productId, variantId] = key.split(':')
        const group = productGroupMap[productId] ?? 'Other'
        return { productId, variantId, qty, group }
      })
  }, [state.quantities])

  // Group items by reviewGroup
  const groups = useMemo(() => {
    const grouped: Record<string, Array<{ productId: string; variantId: string; qty: number }>> = {}
    for (const item of activeItems) {
      if (!grouped[item.group]) grouped[item.group] = []
      grouped[item.group].push({ productId: item.productId, variantId: item.variantId, qty: item.qty })
    }
    return grouped
  }, [activeItems])

  const { activeTotal, compareTotal, savings } = useMemo(
    () => computeTotals(state.quantities, variantLookup),
    [state.quantities, variantLookup]
  )

  return (
    <div className="rounded-[10px] p-5 pb-[31px] lg:flex lg:gap-10 lg:items-start xl:block" style={{ backgroundColor: 'var(--color-panel-bg)' }}>
      {/* LEFT — blue items panel (full-width below xl, flex-1 at xl) */}
      <div className="lg:flex-1 lg:min-w-0">
        <p
          className="text-[10px] xl:text-[12px] font-normal uppercase tracking-[1.6px] leading-none mb-1 xl:mb-[20px]"
          style={{ color: 'var(--color-label-gray)', fontFamily: 'Gilroy-Medium, var(--font-sans)' }}
        >
          REVIEW
        </p>
        <h2
          className="text-[22px] lg:text-[28px] xl:text-[22px] font-normal leading-none tracking-[0.6px] mb-1"
          style={{ color: 'var(--color-text-dark)', fontFamily: 'Gilroy-SemiBold, var(--font-sans)' }}
        >
          Your security system
        </h2>
        <p
          className="text-[12px] lg:text-[16px] xl:text-[14px] font-normal leading-[130%] tracking-[0.6px] mb-2"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'Gilroy-Medium, var(--font-sans)' }}
        >
          Review your personalized protection system <br className="hidden sm:block" />
          designed to keep what matters most safe.
        </p>

        {GROUP_ORDER.map((groupName) => (
          <ReviewGroup
            key={groupName}
            groupName={groupName}
            items={groups[groupName] ?? []}
          />
        ))}

        <ShippingRow />

        {/* Compact footer — hidden at lg (wide footer takes over), shown again at xl */}
        <div className="lg:hidden xl:block">
          <div className="flex items-end justify-between gap-3 pt-4">
            <GuaranteeBadge />
            <div className="flex flex-col items-end gap-1">
              <FinancingLine />
              <TotalRow activeTotal={activeTotal} compareTotal={compareTotal} />
            </div>
          </div>
          <div className="flex flex-col pt-[10px] gap-[4px]">
            <SavingsCallout savings={savings} />
            <CheckoutButton />
            <SaveLink />
          </div>
        </div>
      </div>

      {/* RIGHT — wide footer column, shown only at lg–xl (1024–1279) */}
      <div className="hidden lg:flex lg:flex-col lg:flex-1 lg:max-w-[486px] lg:min-w-0 xl:hidden gap-2">
        <div className="flex items-center gap-[25px]">
          <img
            src="/images/badges/satisfaction-badge.png"
            alt="100% satisfaction guarantee"
            className="w-[131px] h-[131px] object-contain flex-shrink-0"
          />
          <div className="min-w-0 max-w-[330px]">
            <p
              className="text-[18px] font-normal leading-[110%] tracking-[0.6px] mb-4"
              style={{ color: 'var(--color-text-dark)', fontFamily: 'Gilroy-SemiBold, var(--font-sans)' }}
            >
              30-day hassle-free returns
            </p>
            <p
              className="text-[18px] font-normal leading-[110%] tracking-[0.6px]"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'Gilroy-Regular, var(--font-sans)' }}
            >
              If you're not totally in love with the product, we will refund you 100%.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <FinancingLine />
          <TotalRow activeTotal={activeTotal} compareTotal={compareTotal} />
        </div>

        <div className="flex flex-col pt-[10px] gap-1">
          <SavingsCallout savings={savings} />
          <CheckoutButton />
          <SaveLink />
        </div>
      </div>
    </div>
  )
}
