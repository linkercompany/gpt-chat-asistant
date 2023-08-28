type data = {
  name: string
  time: number
}

export function withLogger(func: CallableFunction, name: string) {
  return function (...args: any[]) {
    const time = Date.now()
    const result = func(...args)
    const end = Date.now()

    const data: data = {
      name: name,
      time: end - time
    }

    console.log(data)

    return result
  }
}

export function withLoggerAsync(func: CallableFunction, name: string) {
  return async function (...args: any[]) {
    const time = Date.now()
    const result = await func(...args)
    const end = Date.now()

    const data: data = {
      name: name,
      time: end - time
    }

    console.log(data)

    return result
  }
}
