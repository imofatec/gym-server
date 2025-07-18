import { NotFoundError } from '../../../../domains/shared/errors/not-found-error.ts'
import type { HandlerParams } from '../../chain-of-errors-handler.ts'
import { ChainOfErrorsHandlerImpl } from '../chain-of-error-handler-impl.ts'

export class NotFoundErrorValidator extends ChainOfErrorsHandlerImpl {
  handle(params: HandlerParams): void {
    const { reply, error } = params

    if (error instanceof NotFoundError) {
      const { message } = error
      reply.status(404).send({ message })
      return
    }

    super.handle(params)
  }
}
