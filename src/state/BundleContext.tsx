import { useReducer, useMemo } from 'react'
import { bundleReducer } from './bundleReducer'
import { initialState } from './initialState'
import { loadBundle } from './useLocalStorage'
import { catalog } from '../data/catalog'
import { buildVariantLookup } from '../lib/pricing'
import { BundleContext } from './useBundle'

export function BundleProvider({ children }: { children: React.ReactNode }) {
  // Lazy init: hydrate from localStorage on the very first render so there's no
  // seed→saved flash. Falls back to the seeded state if storage is empty/corrupt.
  const [state, dispatch] = useReducer(bundleReducer, initialState, (seed) => loadBundle() ?? seed)

  const productMap = useMemo(
    () => Object.fromEntries(catalog.products.map((p) => [p.id, p])),
    []
  )

  const variantLookup = useMemo(() => buildVariantLookup(catalog.products), [])

  return (
    <BundleContext.Provider value={{ state, dispatch, productMap, variantLookup }}>
      {children}
    </BundleContext.Provider>
  )
}
