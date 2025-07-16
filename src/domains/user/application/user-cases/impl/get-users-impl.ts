import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import type { UserRepository } from '../../../domain/user-repository.ts'
import type { NoPasswordUser } from '../../dtos/no-password-user.ts'
import { UserMapper } from '../../dtos/user-mapper.ts'
import type { GetUsersUseCase } from '../get-users.ts'

export class GetUsersUseCaseImpl implements GetUsersUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute(pagination?: PaginationParams): Promise<NoPasswordUser[]> {
    const users = await this._repository.findAll(pagination)

    return users.map((user) => UserMapper.toNoPasswordUser(user))
  }
}
