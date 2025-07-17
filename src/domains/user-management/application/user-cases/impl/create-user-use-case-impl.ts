import { ConflictError } from '../../../../shared/errors/conflict-error.ts'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import { User } from '../../../domain/user.ts'
import type { UserRepository } from '../../../domain/user-repository.ts'
import { type UserDTO, UserMapper } from '../../dtos/user.ts'
import type { PasswordEncoder } from '../../security/password-encoder.ts'
import type {
  CreateUserUseCase,
  CreateUserUseCaseRequest,
} from '../create-user-use-case.ts'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  private _repository: UserRepository

  private _passwordEncoder: PasswordEncoder

  constructor(repository: UserRepository, passwordEncoder: PasswordEncoder) {
    this._repository = repository
    this._passwordEncoder = passwordEncoder
  }

  async execute(userRequest: CreateUserUseCaseRequest): Promise<UserDTO> {
    const { username, email, password, role } = userRequest

    await this._verifyUserEmail(email)

    const hashedPassword = await this._passwordEncoder.hash(password)

    const user = User.create({
      username,
      email,
      password: hashedPassword,
      role,
    })

    const { result, error } = await tryCatch(this._repository.save(user))

    if (error) {
      throw new Error('Não foi possivel criar o usuário')
    }

    return UserMapper.toDTO(result)
  }

  private async _verifyUserEmail(email: string): Promise<void> {
    const { error } = await tryCatch(this._repository.findByEmail(email))

    if (error) {
      throw new ConflictError('Email ja existe')
    }
  }
}
