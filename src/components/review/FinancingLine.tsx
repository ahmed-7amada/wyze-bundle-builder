import { catalog } from '../../data/catalog'

export default function FinancingLine() {
  return (
    <span
      className="inline-flex justify-center items-center gap-[10px] text-[12px] lg:max-xl:text-[16px] font-normal leading-none text-white px-[8px] py-[5px] lg:max-xl:py-[8px] lg:max-xl:px-[8px] w-[113px] lg:max-xl:w-[145px] h-[18px] lg:max-xl:h-[27px] rounded-[3px] tracking-[-0.05em]"
      style={{ backgroundColor: 'var(--color-wyze-purple)', fontFamily: 'Gilroy-Medium, var(--font-sans)' }}
    >
      {catalog.financing}
    </span>
  )
}
