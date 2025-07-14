import { buildServer } from './main/server.ts'

;(() => {
  try {
    buildServer()
  } catch (e) {
    const err = e as Error
    // biome-ignore lint/suspicious/noConsole: n sei
    console.log(err)
  }
})()
