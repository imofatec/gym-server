import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.coerce.number().min(0),
  pageSize: z.coerce.number().min(0),
})
