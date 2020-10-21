import type { ChangeWatcher } from "../mod.ts";

export type Watcher<T> = ChangeWatcher<T>; // TODO: BeforeChangeWatcher<T> and others

export type Watchers<T> = {
  change?: ChangeWatcher<T>[];
  // TODO: beforeChange?: BeforeChangeWatcher<T>[];
};
