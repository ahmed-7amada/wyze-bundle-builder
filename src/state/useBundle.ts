import { createContext, useContext, type Dispatch } from 'react'
import type { Action } from './bundleReducer'
import type { BundleState } from './initialState'
import type { Product, Variant } from '../data/catalog'

export interface BundleContextValue {
  state: BundleState
  dispatch: Dispatch<Action>
  productMap: Record<string, Product>
  variantLookup: (key: string) => Variant | undefined
}

export const BundleContext = createContext<BundleContextValue | null>(null)

export function useBundle(): BundleContextValue {
  const ctx = useContext(BundleContext)
  if (!ctx) throw new Error('useBundle must be used inside BundleProvider')
  return ctx
}
