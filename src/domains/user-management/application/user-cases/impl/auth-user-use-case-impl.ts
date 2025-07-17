import { ForbiddenError } from '../../../../shared/errors/forbidden-error.ts'
import { NotFoundError } from '../../../../shared/errors/not-found-error.ts'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { UserRepository } from '../../../domain/user-repository.ts'
import { type UserDTO, UserMapper } from '../../dtos/user.ts'
import type { PasswordEncoder } from '../../security/password-encoder.ts'
import type {
  AuthUserUseCase,
  AuthUserUseCaseRequest,
} from '../auth-user-use-case.ts'

export class AuthUserUseCaseImpl implements AuthUserUseCase {
  private _repository: UserRepository

  private _passwordEncoder: PasswordEncoder

  constructor(repository: UserRepository, passwordEncoder: PasswordEncoder) {
    this._repository = repository
    this._passwordEncoder = passwordEncoder
  }

  async execute(params: AuthUserUseCaseRequest): Promise<UserDTO> {
    const { email, password } = params

    const { result, error } = await tryCatch(
      this._repository.findByEmail(email)
    )

    if (error || !result) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const isValidPassword = await this._passwordEncoder.verify(
      password,
      result.password
    )

    if (!isValidPassword) {
      throw new ForbiddenError('Senha inválida')
    }

    return UserMapper.toDTO(result)
  }
}
