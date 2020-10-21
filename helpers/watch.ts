import { Ref } from "../mod.ts";
import type { ChangeWatcher } from "../mod.ts";

export function watch<T>(_ref: Ref<T>, callback: ChangeWatcher<T>): void {
  _ref._watch(callback);
}
