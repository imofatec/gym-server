import { ConflictErrorValidator } from './impl/400/conflict-error-validator.ts'
import { ForbiddenErrorValidator } from './impl/400/forbidden-error-validator.ts'
import { InvalidParamsValidator } from './impl/400/invalid-params-validator.ts'
import { NotFoundErrorValidator } from './impl/400/not-found-error-validator.ts'

const invalidParamsValidator = new InvalidParamsValidator()
const forbiddenErrorValidator = new ForbiddenErrorValidator()
const notFoundErrorValidator = new NotFoundErrorValidator()
const conflictErrorValidator = new ConflictErrorValidator()

invalidParamsValidator
  .setNext(forbiddenErrorValidator)
  .setNext(notFoundErrorValidator)
  .setNext(conflictErrorValidator)

export const chainOfErrors = invalidParamsValidator
