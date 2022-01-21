let queue = []
let has = {}
import { nextTick } from '../util/next-tick'

function flushSchedularQueue() {
  queue.forEach(watcher => watcher.run())
  queue = []
  has = {}
}

export function queueWatcher(watcher) {
  const id = watcher.id;
  if (has[id] == null) {
    queue.push(watcher)
    has[id] = true
    nextTick(flushSchedularQueue)
  }
}
