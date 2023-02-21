import { HandleRequest, HttpRequest, HttpResponse } from "@fermyon/spin-sdk"

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {

  let counterKey = "executionCount"

  let store = spinSdk.kv.openDefault()

  if (!store.exists(counterKey)) {
    store.set(counterKey, String(1))
  }

  let currentCount = +(decoder.decode(store.get(counterKey)))
  let newCount = String(currentCount + 1)

  store.set(counterKey, newCount)

  return {
    status: 200,
    body: encoder.encode(`Count is: ${newCount}`).buffer
  }
}
