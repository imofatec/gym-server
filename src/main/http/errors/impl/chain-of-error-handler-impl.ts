import type {
  ChainOfErrorsHandler,
  HandlerParams,
} from '../chain-of-errors-handler.ts'

export abstract class ChainOfErrorsHandlerImpl implements ChainOfErrorsHandler {
  private _next?: ChainOfErrorsHandler

  setNext(chain: ChainOfErrorsHandler): ChainOfErrorsHandler {
    this._next = chain
    return chain
  }

  handle(params: HandlerParams): void {
    const { reply, error } = params

    if (this._next) {
      this._next.handle(params)
      return
    }

    const { message } = error
    reply.status(500).send({ message })
  }
}
