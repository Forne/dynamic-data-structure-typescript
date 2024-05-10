// ./src/types.ts
// Тип функции для компаратора
// используется для передачи в функции sort(), contain(), find()
export type comparatorFn<T> = (a: T, b: T) => number;

// Тип функции используемый для итератора
export type callbackFn<T> = (value: T, key?: number) => any;

// Интерфейс ноды
interface IItem<T> {
  data: T;
}
// Однонаправленная нода
// содержит функцию reverseRecursion, используется в рекурсивном вызове forEach
export class Item<T> implements IItem<T> {
  data: T;
  next: Item<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }

  reverseRecursion(callback: callbackFn<T>, key?: number) {
    if (this.next) {
      this.next?.reverseRecursion(callback, key - 1);
    }
    callback(this.data, key);
  }
}

// Двунаправленная нода
export class DItem<T> implements IItem<T> {
  data: T;
  next: DItem<T> | null = null;
  prev: DItem<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

// Интерфейс для струкрут данных
export interface IDStruct<T> {
  get head(): IItem<T>;
  get tail(): IItem<T>;
  get length(): number;
  clear(): void;
  add(data: T, index?: number): boolean;
  addFirst(data: T): void;
  addLast(data: T): void;
  addArray(data: T[]): void;
  contains(callback: callbackFn<T>): boolean;
  get(index?: number): T;
  getFirst(): T;
  getLast(): T;
  forEach(fn: callbackFn<T>, reverse?: boolean): any;
  find(callback: callbackFn<T>): number;
  findLast(callback: callbackFn<T>): number;
  isEmpty(): boolean;
  remove(index: number): T;
  removeFirst(): T;
  removeLast(): T;
  removeFirstByValue(data: T): T;
  removeLastByValue(data: T): T;
  print(reverse?: boolean): void;
  set(index: number, data: T): boolean;
  sort(comparator?: comparatorFn<T>): void;
  swap(indexA: number, indexB: number): boolean;
  toArray(): T[];
}
