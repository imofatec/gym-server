import { BcryptPasswordEncoder } from '../../lib/bcrypt.ts'
import { DrizzleUserRepository } from '../../persistence/drizzle/repositories/user-management/drizzle-user-repository.ts'

const security = {
  passwordEncoder: new BcryptPasswordEncoder(10),
}

const repository = {
  drizzleRepository: new DrizzleUserRepository(),
}

export const userDependencies = {
  security,
  repository,
}
