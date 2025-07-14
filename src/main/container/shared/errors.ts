import { ForbiddenErrorValidator } from '../../http/errors/impl/400/forbidden-error-validator.ts'
import { InvalidParamsValidator } from '../../http/errors/impl/400/invalid-params-validator.ts'
import { NotFoundErrorValidator } from '../../http/errors/impl/400/not-found-error-validator.ts'

const invalidParamsValidator = new InvalidParamsValidator()
const forbiddenErrorValidator = new ForbiddenErrorValidator()
const notFoundErrorValidator = new NotFoundErrorValidator()

invalidParamsValidator
  .setNext(forbiddenErrorValidator)
  .setNext(notFoundErrorValidator)

export const chainOfErrors = invalidParamsValidator
