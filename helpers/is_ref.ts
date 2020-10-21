import { Ref } from "../mod.ts";

/**
 * A simple function that helps you figure out if a Ref really is a Ref.
 * @param _ref the Ref that you wish to learn if it is a ref
 * @returns boolean indicating whether the given parameter is a Ref object
 */
export function isRef(_ref: Ref<any>): boolean {
  return _ref instanceof Ref;
}
