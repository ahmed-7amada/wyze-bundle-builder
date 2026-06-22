import type { BundleState } from './initialState'

const STORAGE_KEY = 'wyze-bundle-builder:v1'

export function saveBundle(state: BundleState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore storage errors
  }
}

export function loadBundle(): BundleState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as BundleState
  } catch {
    return null
  }
}
