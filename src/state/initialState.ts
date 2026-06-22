import { catalog } from '../data/catalog'

export interface BundleState {
  quantities: Record<string, number>
  activeVariant: Record<string, string>
  openStep: string
}

export const SEED_QUANTITIES: Record<string, number> = {
  'cam-v4:white': 1,
  'cam-pan-v3:white': 2,
  'motion-sensor:default': 2,
  'hub:default': 1,
  'microsd:default': 2,
  'cam-unlimited:default': 1,
}

function buildInitialState(): BundleState {
  const quantities = { ...SEED_QUANTITIES }

  const activeVariant: Record<string, string> = {}
  for (const product of catalog.products) {
    const seededKey = Object.keys(quantities).find((k) => k.startsWith(`${product.id}:`))
    if (seededKey) {
      activeVariant[product.id] = seededKey.split(':')[1]
    } else {
      activeVariant[product.id] = product.variants[0].id
    }
  }

  return { quantities, activeVariant, openStep: 'cameras' }
}

export const initialState: BundleState = buildInitialState()
