import type { Product, Variant } from '../data/catalog'

function toCents(n: number): number {
  return Math.round(n * 100)
}

function fromCents(n: number): number {
  return Math.round(n) / 100
}

export function buildVariantLookup(products: Product[]): (key: string) => Variant | undefined {
  const map = new Map<string, Variant>()
  for (const product of products) {
    for (const variant of product.variants) {
      map.set(`${product.id}:${variant.id}`, variant)
    }
  }
  return (key: string) => map.get(key)
}

export interface Totals {
  activeTotal: number
  compareTotal: number
  savings: number
}

export function computeTotals(
  quantities: Record<string, number>,
  lookup: (key: string) => Variant | undefined
): Totals {
  let activeCents = 0
  let compareCents = 0

  for (const [key, qty] of Object.entries(quantities)) {
    if (qty <= 0) continue
    const variant = lookup(key)
    if (!variant) continue
    activeCents += toCents(variant.price) * qty
    compareCents += toCents(variant.compareAt) * qty
  }

  return {
    activeTotal: fromCents(activeCents),
    compareTotal: fromCents(compareCents),
    savings: fromCents(compareCents - activeCents),
  }
}
