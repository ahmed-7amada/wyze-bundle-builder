import { z } from 'zod'
import catalogJson from './catalog.json'

// Schema is the single source of truth for both the runtime check and the types.
const variantSchema = z.object({
  id: z.string(),
  label: z.string(),
  swatch: z.string().nullable(),
  price: z.number(),
  compareAt: z.number(),
  free: z.boolean().optional(),
  image: z.string().optional(),
})

const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  badge: z.string().nullable(),
  image: z.string(),
  priceType: z.enum(['onetime', 'monthly']),
  minQty: z.number(),
  required: z.boolean().optional(),
  variants: z.array(variantSchema),
})

const stepSchema = z.object({
  id: z.string(),
  title: z.string(),
  reviewGroup: z.string(),
  icon: z.string(),
  select: z.enum(['quantity', 'single']),
  products: z.array(z.string()),
})

const catalogSchema = z.object({
  steps: z.array(stepSchema),
  products: z.array(productSchema),
  shipping: z.object({
    label: z.string(),
    price: z.number(),
    compareAt: z.number(),
  }),
  financing: z.string(),
})

// Types are inferred from the schema, so they can never drift from validation.
export type Variant = z.infer<typeof variantSchema>
export type Product = z.infer<typeof productSchema>
export type Step = z.infer<typeof stepSchema>
export type Catalog = z.infer<typeof catalogSchema>

// Parsed & validated at module load. A malformed catalog.json (missing field,
// wrong type, bad enum value) throws immediately — unlike `as Catalog`, which
// would silently accept it.
export const catalog: Catalog = catalogSchema.parse(catalogJson)
