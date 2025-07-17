import { randomUUID } from 'node:crypto'

export class UserId {
  private _value: string

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }

  static create(userId: string) {
    return new UserId(userId)
  }

  get value() {
    return this._value
  }
}
