import type { Step as StepType } from '../../data/catalog'
import { catalog } from '../../data/catalog'
import { useBundle } from '../../state/useBundle'
import StepHeader from './StepHeader'
import ProductCard from '../product/ProductCard'

interface StepProps {
  step: StepType
  stepIndex: number
}

export default function Step({ step, stepIndex }: StepProps) {
  const { state, dispatch, productMap } = useBundle()
  const isOpen = state.openStep === step.id
  const isLastStep = stepIndex === catalog.steps.length - 1
  const nextStep = isLastStep ? null : catalog.steps[stepIndex + 1]

  const stepProducts = step.products.map((id) => productMap[id]).filter(Boolean)

  const handleNext = () => {
    if (nextStep) dispatch({ type: 'TOGGLE_STEP', stepId: nextStep.id })
  }

  return (
    <div
      className={isOpen ? 'rounded-[10px] overflow-hidden' : ''}
      style={isOpen ? { backgroundColor: 'var(--color-panel-bg)' } : undefined}
    >
      <StepHeader
        step={step}
        stepIndex={stepIndex}
        totalSteps={catalog.steps.length}
        isOpen={isOpen}
        onToggle={() => dispatch({ type: 'TOGGLE_STEP', stepId: step.id })}
      />

      {isOpen && (
        <div className="px-4 pb-4">
          {/* ONE card grid for every step (cameras / plan / sensors / extra) so a
              card looks identical no matter how many products the step has.
              auto-FILL (not auto-fit) keeps the empty columns reserved: a step with
              one product (plan, microSD) leaves that card at a single ~224px column,
              left-aligned like Step 1's cards, instead of collapsing the empty tracks
              and letting the lone card stretch across the whole row. Step 1 still fills
              5 across when they fit. No centering — cards flow from the left.
              xl = fixed 2-up side-by-side; a lone trailing card spans both columns and
              centres (handled per-card below). Single-select (plan) = role=radiogroup. */}
          <div
            role={step.select === 'single' ? 'radiogroup' : undefined}
            aria-label={step.select === 'single' ? step.title : undefined}
            className="grid grid-cols-[repeat(auto-fill,minmax(min(224px,100%),1fr))] xl:grid-cols-2 gap-[15px]"
          >
            {stepProducts.map((product, i) => {
              const isLoneTrailing =
                stepProducts.length % 2 === 1 && i === stepProducts.length - 1

              if (!isLoneTrailing) {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    stepSelect={step.select}
                    stepProductIds={step.products}
                  />
                )
              }

              return (
                <div
                  key={product.id}
                  className="xl:col-span-2 xl:w-[calc(50%_-_7.5px)] xl:justify-self-center"
                >
                  <ProductCard
                    product={product}
                    stepSelect={step.select}
                    stepProductIds={step.products}
                  />
                </div>
              )
            })}
          </div>

          {/* Next button — steps 1–3 only */}
          {!isLastStep && nextStep && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleNext}
                className="px-6 py-[5px] rounded-[7px] text-[18px] font-semibold lg:max-xl:font-normal lg:max-xl:leading-[24px] lg:max-xl:[font-family:Gilroy-SemiBold,var(--font-sans)]"
                style={{
                  border: '1px solid var(--color-wyze-purple)',
                  color: 'var(--color-wyze-purple)',
                  background: 'transparent',
                }}
              >
                Next: {nextStep.title}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
