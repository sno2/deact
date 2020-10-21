import { assertStrictEquals } from "./deps.ts";
import { ref } from "../mod.ts";

Deno.test("Getting Ref Values", () => {
  const counter = ref(23);
  assertStrictEquals(typeof counter.value, "number");
  assertStrictEquals(counter.value, 23);
});

Deno.test("Setting Ref Values", () => {
  const counter = ref(23);
  assertStrictEquals(counter.value, 23);
  counter.value = 5;
  assertStrictEquals(counter.value, 5);
  counter.value++;
  assertStrictEquals(counter.value, 6);
});
