# deact

A type enforced Deno module for state management.

## Announcement

This module is in development and is not recommended for production use. If you would like to contribute, then please make sure you clone the repo and have Prettier installed. Also, run `deno test` before submitting an PRs. Thank you!

## Getting Started

First, install and setup Deno on your environment by [following their setup guide](https://deno.land/#installation). After that, you can import the deacivity module via the following code:

```ts
import { ref } "https://deno.land/x/deact";
```

Obviously, you should know what the above code does already before using a state management framework for Deno, so let's get started!

## Usage

The `ref` is a function that creates a stateful object. That basically means that you can observe changes to `ref`s using functions. Here is a basic counter app with the module:

```ts
import { ref } from "https://deno.land/x/deact";

const counter = ref(0); // initial value is `0`
console.log(counter.value); // logs out `0`
```

As you can see, the value that you enter as a parameter for the `ref` function is the initial value. An important thing to note is that the current value of the `ref` is always going to be in the `value` property. This means that you are able to set and get the value of the ref by accessing the `value` property.

Now, you may be remembering that we said above that this module is type-enforced, well let's just see what happens when we try to assign different types to our `counter` `ref`.

```ts
import { ref } from "https://deno.land/x/deact";

const counter = ref(0); // value is implicitly a `number` type

console.log(counter.value); // logs out `0`
counter.value = 5;

console.log(counter.value); // logs out `5`
counter.value = "a string";
```

After that last line, our console spits out the following error:

```sh
> error: TS2322 [ERROR]: Type 'string' is not assignable to type 'number'.
> counter.value = "a string";
> ~~~~~~~~~~~~~
>   at Deno.cwd()
```

As you can see, Typescript automatically infers the type of the `ref.value` via generics; therefore, you can also pass in the type of the `ref` with generics! I advise you to always keep a type variable for the type of your `ref`s, as it makes it a lot easier to edit and use the `ref` later. Here's a working counter that can be a `number` or `string`:

```ts
import { ref } from "https://deno.land/x/deact";

type CounterType = number | string;
const counter = ref<CounterType>(0); // value is explicitly a `number | string` type
console.log(counter.value); // logs out `0`

counter.value = 5;
console.log(counter.value); // logs out `5`

counter.value = "a string";
console.log(counter.value); // logs out `"a string"`
```

Now, our code is working beautifully and is perfectly typed! Now, let's actually get into the lifecycle hooks with deact! Currently, we only have one that is called `watch`; it runs a callback function with the old and new values of the given `ref` as parameters. Here is an example:

```ts
import { ref, watch } from "https://deno.land/x/deact"; // note that we imported `watch`

type CounterType = number;
const counter = ref<CounterType>(0);

watch(counter, (oldValue: CounterType, newValue: CounterType) => {
  console.log(
    `The score went from ${oldValue} to ${newValue} with a ${
      newValue - oldValue
    } point gain!`
  );
});

counter.value = 23;
```

After running the above code, the console will show `"The score went from 0 to 23 with a 23 point gain!"`. You're probably starting to understand the necessity of storing your types for `ref`s. Here is an example using an interval that increments `counter.value` by a random number between `5` and `20`:

```ts
import { ref, watch } from "https://deno.land/x/deact";

type CounterType = number;
const counter = ref<CounterType>(0);

watch(counter, (oldValue: CounterType, newValue: CounterType) => {
  console.log(
    `The score went from ${oldValue} to ${newValue} with a ${
      newValue - oldValue
    } point gain!`
  );
});

setInterval(() => (counter.value += Math.floor(Math.random() * 15) + 5), 500);
```

After running the code, our console should show something like this:

```sh
> The score went from 0 to 15 with a 15 point gain!
> The score went from 15 to 23 with a 8 point gain!
> The score went from 23 to 29 with a 6 point gain!
> The score went from 29 to 46 with a 17 point gain!
> The score went from 46 to 52 with a 6 point gain!
> The score went from 52 to 66 with a 14 point gain!
> The score went from 66 to 72 with a 6 point gain!
> The score went from 72 to 82 with a 10 point gain!
> The score went from 82 to 97 with a 15 point gain!
> The score went from 97 to 114 with a 17 point gain!
> The score went from 114 to 126 with a 12 point gain!
> The score went from 126 to 137 with a 11 point gain!
> The score went from 137 to 146 with a 9 point gain!
```

We now know all of the basic usage of the deact module, but wait! There's more! Not really, you can just use `isRef` to check whether something is a `ref` or not. Obviously, though, this module is type-enforced, so there isn't really a point of using it unless if you are using boring old vanilla javascript.

What? You want an example? Ok, sure, here's how you can use it:

```ts
import { ref, isRef } from "https://deno.land/x/deact";

type CounterType = number;
const counter = ref<CounterType>(0);

console.log(isRef(counter));
console.log(isRef({})); // throws type error
console.log(isRef(23)); // throws type error
```

After running that code, the console will show the following:

```sh
>  error: TS2345 [ERROR]: Argument of type '{}' is not assignable to parameter of type 'Ref<any>'.
>    Type '{}' is missing the following properties from type 'Ref<any>': #value, #watchers, value, _watch
>    console.log(isRef({}));
>                      ~~
>    at Deno.cwd()

>  TS2345 [ERROR]: Argument of type 'number' is not assignable to parameter of type 'Ref<any>'.
>    console.log(isRef(23));
>                      ~~
>    at Deno.cwd()

>  Found 2 errors.
```

If you were using vanilla javascript, though, then that function would be more useful. Another important thing to note is that all types, interfaces, and classes are exported from the module, so everything is open for you to use or extend.

Well, you finished reading the Usage walkthrough. Bye and good luck coding!
