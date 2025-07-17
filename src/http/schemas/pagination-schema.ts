import { z } from 'zod'
import type { PaginationParams } from '../../domains/shared/repository/pagination-params.js'

export const paginationQuerystring = z.object({
  page: z.coerce.number().min(0).optional(),
  pageSize: z.coerce.number().min(0).optional(),
}) satisfies z.ZodType<Partial<PaginationParams>>

export type PaginationQuerystring =
  | Required<z.infer<typeof paginationQuerystring>>
  | undefined
