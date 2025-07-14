export class Email {
  private _value!: string

  constructor(value: string) {
    this.value = value
  }

  static create(email: string) {
    return new Email(email)
  }

  get value() {
    return this._value
  }

  set value(value: string) {
    this._value = value
  }
}
