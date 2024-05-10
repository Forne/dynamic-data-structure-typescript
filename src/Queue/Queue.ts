import { callbackFn } from 'src/types';
import { LinkedList } from '../LinkedList/LinkedList';

export class Queue<T> {
  private list: LinkedList<T>;

  constructor(...data: T[]) {
    this.list = new LinkedList(...data);
  }

  // O(1)
  push(data: T) {
    this.list.addLast(data);
  }

  // O(1)
  shift(): T {
    if (this.list.length == 0) {
      return null;
    }
    return this.list.removeFirst();
  }

  peek(): T {
    return this.list.head ? this.list.head.data : null;
  }

  get length(): number {
    return this.list.length;
  }

  clear(): void {
    return this.list.clear();
  }

  contains(callback: callbackFn<T>): boolean {
    return this.list.contains(callback);
  }

  forEach(callback: callbackFn<T>, reverse: boolean = false): any {
    return this.list.forEach(callback, reverse);
  }

  find(callback: callbackFn<T>): number {
    return this.list.find(callback);
  }

  get isEmpty(): boolean {
    return !this.list.isEmpty();
  }

  toArray(): T[] {
    return this.list.toArray();
  }

  print() {
    this.list.print();
  }
}
