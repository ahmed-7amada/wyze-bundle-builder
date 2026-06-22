import { catalog } from '../../data/catalog'

export default function ShippingRow() {
  return (
    <div className="flex items-center gap-3 py-3">
      {/* Icon in 41×41 white box — matches review thumbnail sizing */}
      <div className="w-[41px] h-[41px] rounded-[5px] bg-white flex-shrink-0 flex items-center justify-center">
        <img src="/images/brand/Fast Shipping.png" alt="Fast shipping" className="w-full h-full object-contain" />
      </div>
      <span className="text-[14px] font-medium flex-1 lg:max-xl:text-[18px] lg:max-xl:font-normal lg:max-xl:leading-[16px] lg:max-xl:tracking-[0.005em] lg:max-xl:[font-family:Gilroy-Medium,var(--font-sans)] xl:font-normal xl:leading-[16px] xl:tracking-[0.005em] xl:[font-family:Gilroy-Medium,var(--font-sans)]" style={{ color: 'var(--color-text-dark)' }}>
        {catalog.shipping.label}
      </span>
      {/* Stacked prices — matches PriceTag review variant */}
      <div className="flex flex-col items-end">
        <span className="text-[14px] font-medium line-through" style={{ color: 'var(--color-price-strike-rev)' }}>
          ${catalog.shipping.compareAt.toFixed(2)}
        </span>
        <span className="text-[14px] font-semibold" style={{ color: 'var(--color-wyze-purple)' }}>
          FREE
        </span>
      </div>
    </div>
  )
}
