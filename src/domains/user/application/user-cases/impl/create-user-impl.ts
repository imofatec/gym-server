import { User } from '../../../domain/user.ts'
import type { UserRepository } from '../../../domain/user-repository.ts'
import type { NoPasswordUser } from '../../dtos/no-password-user.ts'
import { UserMapper } from '../../dtos/user-mapper.ts'
import type { PasswordEncoder } from '../../security/password-encoder.ts'
import type {
  CreateUserUseCase,
  CreateUserUseCaseRequest,
} from '../create-user.ts'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  private _repository: UserRepository

  private _passwordEncoder: PasswordEncoder

  constructor(repository: UserRepository, passwordEncoder: PasswordEncoder) {
    this._repository = repository
    this._passwordEncoder = passwordEncoder
  }

  async execute(
    userRequest: CreateUserUseCaseRequest
  ): Promise<NoPasswordUser> {
    const { username, email, password, role } = userRequest

    const hashedPassword = await this._passwordEncoder.hash(password)

    const user = User.create({
      username,
      email,
      password: hashedPassword,
      role,
    })

    const savedUser = await this._repository.save(user)

    return UserMapper.toNoPasswordUser(savedUser)
  }
}
