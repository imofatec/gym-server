import '@fastify/jwt'
import type { UserRole } from '../../../domains/user-management/domain/value-objects/user-role.ts'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {
      id: string
      username: string
      email: string
      role: UserRole
    }
  }
}
