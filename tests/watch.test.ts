import { assertStrictEquals } from "./deps.ts";
import { ref, watch } from "../mod.ts";

Deno.test("Watch with Ref #1", () => {
  type CounterType = number;
  const counter = ref<CounterType>(0);
  assertStrictEquals(counter.value, 0);
  watch(counter, (oldValue: CounterType, newValue: CounterType) => {
    assertStrictEquals(newValue - oldValue, 5);
  });
  counter.value += 5;
  counter.value += 5;
});

Deno.test("Watch with Ref #2", () => {
  type NameType = string;
  const name = ref("Carter1");
  let timesWatched = 0;
  watch(name, (_, __) => timesWatched++);
  name.value = "Carter2";
  name.value = "Carter3";
  name.value = "Carter4";
  assertStrictEquals(
    timesWatched,
    3,
    "The amount of times that name's value should have changed is 3"
  );
});
