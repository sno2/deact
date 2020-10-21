import { Ref } from "../mod.ts";

export function ref<T>(initialValue: T): Ref<T> {
  return Object.seal(new Ref<T>(initialValue));
}
