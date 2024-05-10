import { callbackFn } from 'src/types';
import { DoubleLinkedList } from '../DoubleLinkedList/DoubleLinkedList';

export class Deque<T> {
  private list: DoubleLinkedList<T>;

  constructor(...data: T[]) {
    this.list = new DoubleLinkedList(...data);
  }

  // O(1)
  addFront(data: T) {
    this.list.addFirst(data);
  }

  // O(1)
  peekFront(): T {
    return this.list.head ? this.list.head.data : null;
  }

  // O(1)
  removeFront(): T {
    if (this.list.length == 0) {
      return null;
    }
    return this.list.removeFirst();
  }

  // O(1)
  addBack(data: T) {
    this.list.addLast(data);
  }

  // O(1)
  peekBack(): T {
    return this.list.tail ? this.list.tail.data : null;
  }

  // O(1)
  removeBack(): T {
    if (this.list.length == 0) {
      return null;
    }
    return this.list.removeLast();
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

  isEmpty(): boolean {
    return !this.list.isEmpty();
  }

  toArray(): T[] {
    return this.list.toArray();
  }

  print() {
    this.list.print();
  }
}
