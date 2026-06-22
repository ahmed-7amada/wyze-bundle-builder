import { describe, it, expect } from 'vitest'
import { computeTotals, buildVariantLookup } from './pricing'
import { catalog } from '../data/catalog'
import { SEED_QUANTITIES } from '../state/initialState'

describe('computeTotals', () => {
  it('returns correct totals for seed data', () => {
    const lookup = buildVariantLookup(catalog.products)
    const { activeTotal, compareTotal, savings } = computeTotals(SEED_QUANTITIES, lookup)
    expect(activeTotal).toBe(187.89)
    expect(compareTotal).toBe(238.81)
    expect(savings).toBe(50.92)
  })

  it('returns zeros for empty quantities', () => {
    const lookup = buildVariantLookup(catalog.products)
    const { activeTotal, compareTotal, savings } = computeTotals({}, lookup)
    expect(activeTotal).toBe(0)
    expect(compareTotal).toBe(0)
    expect(savings).toBe(0)
  })

  it('ignores keys with qty 0', () => {
    const lookup = buildVariantLookup(catalog.products)
    const { activeTotal } = computeTotals({ 'cam-v4:white': 0 }, lookup)
    expect(activeTotal).toBe(0)
  })
})
