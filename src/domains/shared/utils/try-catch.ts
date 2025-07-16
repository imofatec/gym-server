export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<
  | {
      readonly result: Awaited<T>
      readonly error: null
    }
  | {
      readonly result: null
      readonly error: E
    }
> {
  try {
    const result = await promise
    return { result, error: null } as const
  } catch (e) {
    const error = e as E
    return { result: null, error } as const
  }
}
