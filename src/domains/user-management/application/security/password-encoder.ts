export interface PasswordEncoder {
  hash(plainText: string): Promise<string>
  verify(plainText: string, hashedPassword: string): Promise<boolean>
}
