import { InvalidParamsError } from '../../../shared/errors/invalid-params-error.ts'

export class Username {
  private _value!: string

  constructor(value: string) {
    this.value = value
  }

  static create(username: string) {
    return new Username(username)
  }

  get value() {
    return this._value
  }

  set value(value: string) {
    if (value.length < 5) {
      throw new InvalidParamsError(
        'Nome de usuário precisa ter no mínimo 4 caracteres'
      )
    }

    if (value.length > 100) {
      throw new InvalidParamsError(
        'Nome de usuário só pode ter no máximo 100 caracteres'
      )
    }

    this._value = value
  }
}
