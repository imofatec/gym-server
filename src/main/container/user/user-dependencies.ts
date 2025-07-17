import { DrizzleUserRepository } from '../../../domains/user-management/infra/persistence/drizzle/drizzle-user-repository.ts'
import { BcryptPasswordEncoder } from '../../lib/bcrypt.ts'

const security = {
  passwordEncoder: new BcryptPasswordEncoder(10),
}

const repository = {
  drizzleRepository: new DrizzleUserRepository(),
}

export const dependencies = {
  security,
  repository,
}
