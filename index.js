import { isLatest } from './utils';

export default class LWWSet {
  constructor() {
    this.addSet = new Map();
    this.removeSet = new Map();
  }

  add(obj, time) {
    const prev = this.addSet.get(obj);

    if (isLatest(prev, time)) {
      this.addSet.set(obj, time);
    }
  }

  remove(obj, time) {
    const prev = this.removeSet.get(obj);

    if (isLatest(prev, time)) {
      this.removeSet.set(obj, time);
    }
  }

  get() {
    const result = [];
    this.addSet.forEach((value, key) => {
      const removeTime = this.removeSet.get(key);

      if (isLatest(removeTime, value)) {
        result.push(key);
      }
    });

    return result;
  }

  size() {
    return this.get().length;
  }
}
