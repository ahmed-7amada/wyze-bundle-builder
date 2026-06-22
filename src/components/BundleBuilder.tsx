import { catalog } from '../data/catalog'
import Step from './accordion/Step'
import ReviewPanel from './review/ReviewPanel'

export default function BundleBuilder() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-page-bg)' }}>
      <div className="mx-auto w-full max-w-[1290px] px-0 sm:px-8 pt-8 lg:pt-[49px] pb-0 sm:pb-12">
        {/* Phone-only heading (appears only in the phone frame, not desktop) */}
        <h1
          className="md:hidden text-[31.88px] font-normal text-center leading-[110%] tracking-[-0.06px] mb-6"
          style={{ color: 'var(--color-text-dark)', fontFamily: 'Gilroy-Bold, var(--font-sans)' }}
        >
          Let's get started!
        </h1>

        <div className="flex flex-col xl:flex-row gap-[29px]">
          <div className="flex-1 flex flex-col gap-1">
            {catalog.steps.map((step, index) => (
              <Step key={step.id} step={step} stepIndex={index} />
            ))}
          </div>

          <div className="w-full xl:w-[399px] flex-shrink-0">
            <div className="xl:sticky xl:top-8">
              <ReviewPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
