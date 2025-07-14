import { UniqueEntityId } from './unique-entity-id.ts'

export abstract class BaseEntity<T> {
  private _id: UniqueEntityId

  protected props: T

  get id() {
    return this._id
  }

  constructor(data: T, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId(id)
    this.props = data
  }
}
