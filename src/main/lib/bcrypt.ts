import bcrypt from 'bcryptjs'
import type { PasswordEncoder } from '../../domains/user/application/security/password-encoder.ts'

export class BcryptPasswordEncoder implements PasswordEncoder {
  private _salt: number

  constructor(salt: number) {
    this._salt = salt
  }

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this._salt)
  }

  async verify(plainText: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword)
  }
}
