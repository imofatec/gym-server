import { ForbiddenError } from '../../../../../domains/shared/errors/forbidden-error.ts'
import type { HandlerParams } from '../../chain-of-errors-handler.ts'
import { ChainOfErrorsHandlerImpl } from '../chain-of-error-handler-impl.ts'

export class ForbiddenErrorValidator extends ChainOfErrorsHandlerImpl {
  handle(params: HandlerParams): void {
    const { reply, error } = params

    if (error instanceof ForbiddenError) {
      const { message } = error
      reply.status(403).send({ message })
      return
    }

    super.handle(params)
  }
}
