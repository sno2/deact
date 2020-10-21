import type { ChangeWatcher, Watchers } from "../mod.ts";
// TODO: implement before change watcher and others
export class Ref<T> {
  #value: T;
  #watchers: Watchers<T> = {
    change: [],
  };

  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  get value(): T {
    return this.#value;
  }

  set value(newValue: T) {
    const oldValue = this.#value;
    this.#value = newValue;
    for (const changeWatcher of this.#watchers.change || []) {
      changeWatcher(oldValue, this.#value);
    }
  }

  _watch(callback: ChangeWatcher<T>): void {
    this.#watchers.change?.push(callback);
  }

  toString() {
    return `{ value: ${this.#value} }`;
  }
}
