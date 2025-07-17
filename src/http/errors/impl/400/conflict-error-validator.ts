import { ConflictError } from '../../../../domains/shared/errors/conflict-error.ts'
import type { HandlerParams } from '../../chain-of-errors-handler.ts'
import { ChainOfErrorsHandlerImpl } from '../chain-of-error-handler-impl.ts'

export class ConflictErrorValidator extends ChainOfErrorsHandlerImpl {
  handle(params: HandlerParams): void {
    const { reply, error } = params

    if (error instanceof ConflictError) {
      const { message } = error
      reply.status(409).send({ message })
      return
    }

    super.handle(params)
  }
}
