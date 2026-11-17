/**
 * Small polyfills so the app also runs on older phones (e.g. iPhones before iOS 16.4).
 * Each one is added only when the browser lacks the feature.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
const AP = Array.prototype as any;

function define(target: any, name: string, value: unknown) {
  if (!(name in target)) Object.defineProperty(target, name, { value, writable: true, configurable: true, enumerable: false });
}

define(AP, "at", function (this: any[], i: number) {
  const n = Math.trunc(i) || 0;
  return this[n < 0 ? this.length + n : n];
});
define(String.prototype, "at", function (this: string, i: number) {
  const n = Math.trunc(i) || 0;
  return this.charAt(n < 0 ? this.length + n : n) || undefined;
});
define(AP, "findLast", function (this: any[], fn: (v: any, i: number, a: any[]) => boolean, thisArg?: any) {
  for (let i = this.length - 1; i >= 0; i--) if (fn.call(thisArg, this[i], i, this)) return this[i];
  return undefined;
});
define(AP, "findLastIndex", function (this: any[], fn: (v: any, i: number, a: any[]) => boolean, thisArg?: any) {
  for (let i = this.length - 1; i >= 0; i--) if (fn.call(thisArg, this[i], i, this)) return i;
  return -1;
});
define(AP, "toSorted", function (this: any[], cmp?: (a: any, b: any) => number) {
  return this.slice().sort(cmp);
});
define(AP, "toReversed", function (this: any[]) {
  return this.slice().reverse();
});
define(Object, "hasOwn", (o: object, k: PropertyKey) => Object.prototype.hasOwnProperty.call(o, k));
define(String.prototype, "replaceAll", function (this: string, search: string | RegExp, replacement: any) {
  if (search instanceof RegExp) return this.replace(search, replacement);
  return this.split(search).join(replacement);
});
define(Promise, "withResolvers", function () {
  let resolve: (v: unknown) => void = () => {};
  let reject: (e: unknown) => void = () => {};
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
});
if (typeof (globalThis as any).structuredClone !== "function") {
  (globalThis as any).structuredClone = (v: unknown) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
}
if (typeof AbortSignal !== "undefined" && !("timeout" in AbortSignal)) {
  (AbortSignal as any).timeout = (ms: number) => {
    const c = new AbortController();
    setTimeout(() => c.abort(), ms);
    return c.signal;
  };
}
