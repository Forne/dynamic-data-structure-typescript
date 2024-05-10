import { Item, callbackFn, comparatorFn } from '../types';

export class CircularLinkedList<T> {
  private _head: Item<T> | null = null;
  private _tail: Item<T> | null = null;
  private _length: number = 0;

  constructor(...values: T[]) {
    values.forEach((v) => {
      this.addLast(v);
    });
  }

  get head(): Item<T> {
    return this._head;
  }

  get tail(): Item<T> {
    return this._tail;
  }

  get length(): number {
    return this._length;
  }

  // Очситка списка
  // O(1)
  clear(): void {
    this._head = null;
    this._tail = null;
  }

  // Вставка в начало
  // O(1)
  addFirst(data: T): void {
    const newItem = new Item<T>(data);

    if (this.head) {
      newItem.next = this._head;
      this._head = newItem;
    } else {
      this._head = newItem;
      this._tail = newItem;
      newItem.next = newItem;
    }

    this._length++;
  }

  // Вставка в конец
  // O(1)
  addLast(data: T): void {
    const newItem = new Item<T>(data);

    if (this.tail) {
      this._tail.next = newItem;
      this._tail = newItem;
      newItem.next = this._head;
    } else {
      this._head = newItem;
      this._tail = newItem;
      newItem.next = newItem;
    }

    this._length++;
  }

  // Вставка массива в конец
  // O(n)
  addArray(data: T[]): void {
    for (let i = 0; i < data.length; i++) {
      this.addLast(data[i]);
    }
  }

  // Проверяет, содержит ли список элемент
  // O(n)
  contains(callback: callbackFn<T>): boolean {
    let current = this._head;
    for (let i = 0; i < this._length; i++) {
      if (callback(current.data)) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Получение элемента по индексу
  // TODO: check
  // O(n)
  get(index: number = 0): T {
    if (index > this._length - 1) {
      return null;
    }

    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  // O(1)
  getFirst(): T {
    return this._head.data;
  }

  // O(1)
  getLast(): T {
    return this._tail.data;
  }

  // Итератор
  // O(n)
  forEach(callback: callbackFn<T>): any {
    let current = this._head;
    for (let i = 0; i < this._length; i++) {
      callback(current.data, i);
      current = current.next;
    }
  }

  // Поиск ближайшего элемента в списке, возвращает индекс
  // O(n)
  find(callback: callbackFn<T>): number {
    let current = this._head;
    for (let i = 0; i < this._length; i++) {
      if (callback(current.data)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  // Поиск последнего найденного элемента в списке, возвращает индекс
  // O(n)
  findLast(callback: callbackFn<T>): number {
    let current = this._head;
    let finded: number = -1;
    for (let i = 0; i < this._length; i++) {
      if (callback(current.data)) {
        finded = i;
      }
      current = current.next;
    }
    return finded;
  }

  // O(1)
  isEmpty(): boolean {
    return !this._head;
  }

  // Установка значение по индексу
  // O(n)
  set(index: number, data: T): boolean {
    if (index > this._length - 1) {
      return false;
    }

    let current = this._head;
    for (let i = 0; i < index; i++) {
      if (i == index) {
        current.data = data;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Сортировка
  // O(n^2)
  sort(comparator?: comparatorFn<T>): void {
    for (let i = 0; i < this.length; i++) {
      let curr = this._head;
      let counter = 0;
      for (let j = 0; j < this.length - i; j++) {
        // console.log(`sort ${i} ${j}`)
        if (curr && curr.next && comparator(curr.data, curr.next.data) > 0) {
          [curr.data, curr.next.data] = [curr.next.data, curr.data];
          counter++;
        }
        curr = curr.next;
      }
      if (counter == 0) {
        return;
      }
    }
  }

  // Изменение местами элементов по индексам
  // O(n)
  swap(indexA: number, indexB: number): boolean {
    if (indexA >= this._length && indexB >= this._length) {
      return false;
    }
    let current: Item<T> = this._head;
    let nodeA: Item<T> = null;
    let nodeB: Item<T> = null;
    for (let i = 0; i < Math.max(indexA, indexB); i++) {
      if (i == indexA) nodeA = current;
      if (i == indexB) nodeB = current;
      if (nodeA && nodeB) {
        [nodeA.data, nodeB.data] = [nodeB.data, nodeA.data];
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Вывод списка в консоль
  // O(n)
  print(): void {
    let string = '[ ';
    this.forEach((value, index) => {
      if (typeof value == 'object') {
        string += '\n';
        const b = [];
        Object.keys(value).forEach(function (k) {
          b.push(k + ': ' + value[k]);
        });
        string += '   { ' + b.join(', ') + ' }';
        if (index == this.length - 1) {
          string += '\n';
        }
      } else {
        string += value;
      }
      if (index != this.length - 1) {
        string += ', ';
      }
    });
    string += ' ]';
    console.log(string);
  }

  // Преобразование в массив
  // O(n)
  toArray(): T[] {
    const result: T[] = [];
    this.forEach((v) => result.push(v));
    return result;
  }

  // Создание списка из массива
  // O(n)
  static fromArray<T>(data: T[]): CircularLinkedList<T> {
    return new CircularLinkedList<T>(...data);
  }
}
