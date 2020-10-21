export type BeforeChangeWatcher<T> = (
  currentValue: T,
  nextValue: T,
) => boolean | Promise<boolean>;
