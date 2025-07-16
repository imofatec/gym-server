import type { FastifyError, FastifyReply } from 'fastify'

export type HandlerParams = {
  error: FastifyError
  reply: FastifyReply
}

export interface ChainOfErrorsHandler {
  setNext(chain: ChainOfErrorsHandler): ChainOfErrorsHandler
  handle(params: HandlerParams): void
}
