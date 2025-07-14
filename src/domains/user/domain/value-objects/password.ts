import { InvalidParamsError } from '../../../shared/errors/invalid-params-error.ts'

export class Password {
  private _value!: string

  constructor(value: string) {
    this.value = value
  }

  static create(password: string) {
    return new Password(password)
  }

  get value() {
    return this._value
  }

  set value(value: string) {
    if (value.trim() === '') {
      throw new InvalidParamsError('A senha não pode estar em branco')
    }

    // biome-ignore lint/performance/useTopLevelRegex: n sei como arrumar
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/

    if (!regex.test(value)) {
      throw new InvalidParamsError(
        'A senha ter no mínimo uma letra maiúscula e 1 número'
      )
    }

    this._value = value
  }
}
