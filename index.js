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

  getLatest() {
    const union = this.get();

    return union[union.length - 1];
  }

  size() {
    return this.get().length;
  }

  isLatest(value) {
    const union = this.get();

    return value === union[union.length - 1];
  }

  has(value) {
    const union = this.get();

    return union.filter(item => value === item).length >= 1;
  }
}
