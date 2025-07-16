import '@fastify/jwt'
import type { UserRole } from '../../../domains/user/domain/value-objects/user-role.ts'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {
      username: string
      role: UserRole
    }
    user: {
      id: string
      username: string
      email: string
      role: UserRole
    }
  }
}
