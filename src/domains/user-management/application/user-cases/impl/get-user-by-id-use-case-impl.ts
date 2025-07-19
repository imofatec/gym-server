import { UniqueEntityId } from '../../../../shared/entities/unique-entity-id.ts'
import { NotFoundError } from '../../../../shared/errors/not-found-error.ts'
import { tryCatch } from '../../../../shared/utils/try-catch.ts'
import type { UserRepository } from '../../../domain/user-repository.ts'
import { type UserDTO, UserMapper } from '../../dtos/user.ts'
import type { GetUserByIdUseCase } from '../get-user-by-id-use-case.ts'

export class GetUserByIdUseCaseImpl implements GetUserByIdUseCase {
  private _uRepository: UserRepository

  constructor(uRepository: UserRepository) {
    this._uRepository = uRepository
  }
  async execute(id: UserDTO['id']): Promise<UserDTO> {
    const { result } = await tryCatch(
      this._uRepository.findById(new UniqueEntityId(id))
    )

    if (!result) {
      throw new NotFoundError('Usuário não encontrado')
    }

    return UserMapper.toDTO(result)
  }
}
