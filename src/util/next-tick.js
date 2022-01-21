let callbacks = []
let state = false
export function nextTick(cb) {
  callbacks.push(cb)
  if (state) return
  state = true
  setTimeout(() => {
    console.log(callbacks)
    callbacks.forEach(cb => cb())
    state = false
  }, 0)
}
