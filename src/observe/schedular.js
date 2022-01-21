let queue = []
let has = {}
import { nextTick } from '../util/next-tick'

export function queueWatcher(watcher) {
  console.log(queue)
  const id = watcher.id;
  console.log(id)
  console.log(has[id])
  if (has[id] == null) {
    queue.push(watcher)
    has[id] = true
    console.log(queue)
    setTimeout(function () {

      queue.forEach(watcher => watcher.run())
      queue = []
      has = {}
    }, 0)

  }
}
