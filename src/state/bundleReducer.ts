import type { BundleState } from './initialState'

export type { BundleState }

export type Action =
  | { type: 'SET_ACTIVE_VARIANT'; productId: string; variantId: string }
  | { type: 'INC'; key: string }
  | { type: 'DEC'; key: string; minQty: number }
  | { type: 'SELECT_PLAN'; key: string; planProductIds: string[] }
  | { type: 'TOGGLE_STEP'; stepId: string }

export function bundleReducer(state: BundleState, action: Action): BundleState {
  switch (action.type) {
    case 'SET_ACTIVE_VARIANT':
      return {
        ...state,
        activeVariant: { ...state.activeVariant, [action.productId]: action.variantId },
      }

    case 'INC': {
      const current = state.quantities[action.key] ?? 0
      return {
        ...state,
        quantities: { ...state.quantities, [action.key]: current + 1 },
      }
    }

    case 'DEC': {
      const current = state.quantities[action.key] ?? 0
      const next = Math.max(action.minQty, current - 1)
      return {
        ...state,
        quantities: { ...state.quantities, [action.key]: next },
      }
    }

    case 'SELECT_PLAN': {
      const newQuantities = { ...state.quantities }
      for (const k of Object.keys(newQuantities)) {
        if (action.planProductIds.includes(k.split(':')[0])) {
          newQuantities[k] = 0
        }
      }
      newQuantities[action.key] = 1
      return { ...state, quantities: newQuantities }
    }

    case 'TOGGLE_STEP':
      return {
        ...state,
        openStep: action.stepId,
      }

    default:
      return state
  }
}
