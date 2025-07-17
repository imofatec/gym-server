import type { PaginationParams } from '../../../../shared/repository/pagination-params.js'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { UserRepository } from '../../../domain/user-repository.ts'
import { type UserDTO, UserMapper } from '../../dtos/user.ts'
import type { GetUsersUseCase } from '../get-users-use-case.ts'

export class GetUsersUseCaseImpl implements GetUsersUseCase {
  private _repository: UserRepository

  constructor(repository: UserRepository) {
    this._repository = repository
  }

  async execute(pagination?: PaginationParams): Promise<UserDTO[]> {
    const { result, error } = await tryCatch(
      this._repository.findAll(pagination)
    )

    if (error) {
      throw new Error('Não foi possivel recuperar os usuários')
    }

    return result.map((user) => UserMapper.toDTO(user))
  }
}
