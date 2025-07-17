import { InvalidParamsError } from '../../../../domains/shared/errors/invalid-params-error.ts'
import type { HandlerParams } from '../../chain-of-errors-handler.ts'
import { ChainOfErrorsHandlerImpl } from '../chain-of-error-handler-impl.ts'

export class InvalidParamsValidator extends ChainOfErrorsHandlerImpl {
  handle(params: HandlerParams): void {
    const { reply, error } = params

    if (error instanceof InvalidParamsError) {
      const { message } = error
      reply.status(400).send({ message })
      return
    }

    super.handle(params)
  }
}
