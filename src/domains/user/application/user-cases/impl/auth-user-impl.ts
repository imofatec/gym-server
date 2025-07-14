import { ForbiddenError } from '../../../../shared/errors/forbidden-error.ts'
import { NotFoundError } from '../../../../shared/errors/not-found-error.ts'
import type { UserRepository } from '../../../domain/user-repository.ts'
import type { NoPasswordUser } from '../../dtos/no-password-user.ts'
import { UserMapper } from '../../dtos/user-mapper.ts'
import type { PasswordEncoder } from '../../security/password-encoder.ts'
import type { AuthUserUseCase, AuthUserUseCaseRequest } from '../auth-user.ts'

export class AuthUserUseCaseImpl implements AuthUserUseCase {
  private _repository: UserRepository

  private _passwordEncoder: PasswordEncoder

  constructor(repository: UserRepository, passwordEncoder: PasswordEncoder) {
    this._repository = repository
    this._passwordEncoder = passwordEncoder
  }

  async execute(params: AuthUserUseCaseRequest): Promise<NoPasswordUser> {
    const { email, password } = params

    const foundUser = await this._repository.findByEmail(email)

    if (!foundUser) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const isValidPassword = await this._passwordEncoder.verify(
      password,
      foundUser.password
    )

    if (!isValidPassword) {
      throw new ForbiddenError('Senha inválida')
    }

    return UserMapper.toNoPasswordUser(foundUser)
  }
}
