import { IDStruct, Item, callbackFn, comparatorFn } from '../types';

export class LinkedList<T> implements IDStruct<T> {
  private _head: Item<T> | null = null;
  private _tail: Item<T> | null = null;
  private _length: number = 0;

  // Принимает множество значений
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

  // Вставка по индексу, сдвигает текущий элемент по индексу вправо
  // O(n)
  // true - если в результате изменился список
  // false - если нет (не попали по индексу)
  add(data: T, index: number = 0): boolean {
    if (index > this.length) {
      return false;
    }
    // используем готовые функции для вставки в начало или конец
    if (index == 0) {
      this.addFirst(data);
      return true;
    }
    if (index == this.length) {
      this.addLast(data);
      return true;
    }
    // иначе ищем индекс и вставляем элемент
    const newItem = new Item<T>(data);
    let currentIndex = 0;
    let currentItem: Item<T> = this.head;
    while (currentIndex + 1 != index) {
      console.log(currentIndex, index, currentItem.data);
      currentItem = currentItem!.next;
      currentIndex++;
    }
    newItem.next = currentItem.next;
    currentItem.next = newItem;
    this._length++;
    return true;
  }

  // Вставка в начало списка
  // O(1)
  addFirst(data: T): void {
    const newItem = new Item<T>(data);

    if (!this._head) {
      this._head = newItem;
      this._tail = newItem;
    } else {
      newItem.next = this._head;
      this._head = newItem;
    }
    this._length++;
  }

  // Вставка в конец списка
  // O(1)
  addLast(data: T): void {
    const newItem = new Item<T>(data);
    if (!this._tail) {
      this._head = newItem;
      this._tail = newItem;
    } else {
      this._tail.next = newItem;
      this._tail = newItem;
    }
    this._length++;
  }

  // Вставка массива в конец
  // TODO вставка по индексу
  // O(n)
  addArray(data: T[]): void {
    for (let i = 0; i < data.length; i++) {
      this.addLast(data[i]);
    }
  }

  // Проверяет, содержит ли список элемент
  // O(n)
  contains(callback: callbackFn<T>): boolean {
    let current: Item<T> = this._head;
    while (current) {
      if (callback(current.data)) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Получение элемента по индексу
  // O(n)
  get(index: number = 0): T {
    if (index > this._length - 1) {
      return null;
    }
    let currentIndex = 0;
    let current: Item<T> = this._head;
    while (current) {
      if (currentIndex == index) {
        return current.data;
      }
      currentIndex++;
      current = current.next;
    }
    return null;
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
  forEach(callback: callbackFn<T>, reverse: boolean = false): any {
    if (reverse) {
      this._head?.reverseRecursion(callback, this.length - 1);
    } else {
      let currentIndex = 0;
      let current: Item<T> = this._head;
      while (current) {
        callback(current.data, currentIndex);
        currentIndex++;
        current = current.next;
      }
    }
  }

  // Поиск первого найденного элемента в списке, возвращает индекс
  // O(n)
  find(callback: callbackFn<T>): number {
    let currentIndex = 0;
    let current: Item<T> = this._head;
    while (current) {
      if (callback(current.data)) {
        return currentIndex;
      }
      currentIndex++;
      current = current.next;
    }
    return -1;
  }

  // Поиск последнего найденного элемента в списке, возвращает индекс
  // O(n)
  findLast(callback: callbackFn<T>): number {
    let currentIndex = 0;
    let current: Item<T> = this._head;
    let finded: number = -1;
    while (current) {
      if (callback(current.data)) {
        finded = currentIndex;
      }
      currentIndex++;
      current = current.next;
    }
    return finded;
  }

  // O(1)
  isEmpty(): boolean {
    return !this._head;
  }

  // Удаляет элемент по индексу
  // возвращает значение удаленного элемента
  // O(n)
  remove(index: number): T {
    if (index > this._length - 1) {
      return null;
    }
    if (index == 0) {
      return this.removeFirst();
    }
    let currentIndex = 0;
    let current: Item<T> = this._head;
    while (currentIndex + 1 != index) {
      currentIndex++;
      current = current.next;
    }
    const element = current.next;

    current.next = current.next.next;
    if (this.tail == element) {
      this._tail = current.next;
    }

    this._length--;
    return element.data;
  }

  // Удаляет первый элемент
  // возвращает значение удаленного элемента
  // O(1)
  removeFirst(): T {
    const element = this._head;

    if (!element) {
      return null;
    }

    if (!this._head.next) {
      this._head = null;
      this._tail = null;
    } else {
      this._head = this._head.next;
    }

    this._length--;
    return element.data;
  }

  // Удаляет последний элемент
  // возвращает значение удаленного элемента
  // O(n)
  removeLast(): T {
    const element = this._tail;

    if (!element) {
      return null;
    }

    let current: Item<T> = this._head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    current!.next = null;
    this._tail = current;

    this._length--;
    return element.data;
  }

  // Удалить первый найденный элемент по значению
  // O(n)
  removeFirstByValue(obj: T): T {
    return this.remove(this.find((x) => x == obj));
  }

  // Удалить последний найденный элемент по значению
  // O(n)
  removeLastByValue(obj: T): T {
    return this.remove(this.findLast((x) => x == obj));
  }

  // Установка значение по индексу
  // O(n)
  set(index: number, data: T): boolean {
    if (index > this._length - 1) {
      return false;
    }
    let currentIndex = 0;
    let current: Item<T> = this._head;
    while (current) {
      if (currentIndex == index) {
        current.data = data;
        return true;
      }
      currentIndex++;
      current = current.next;
    }
    return false;
  }

  // метод сортировки Пузырьком, принимающий компаратор
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
    let currentIndex = 0;
    let current: Item<T> = this._head;
    let nodeA: Item<T> = null;
    let nodeB: Item<T> = null;
    while (current) {
      if (currentIndex == indexA) nodeA = current;
      if (currentIndex == indexB) nodeB = current;
      if (nodeA && nodeB) {
        [nodeA.data, nodeB.data] = [nodeB.data, nodeA.data];
        return true;
      }
      currentIndex++;
      current = current.next;
    }
    return false;
  }

  // Вывод списка в консоль
  // O(n)
  print(reverse: boolean = false): void {
    let string = '[ ';
    this.forEach((value, index) => {
      // если объект, то переводим в строку
      // но проще через JSON.stringify(value)
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
    }, reverse);
    string += ' ]';
    console.log(string);
  }

  // Преобразование в массив
  // O(n)
  toArray(): T[] {
    const result: T[] = [];
    let current: Item<T> | null = this._head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // Создание списка из массива
  // O(n)
  static fromArray<T>(data: T[]): LinkedList<T> {
    return new LinkedList<T>(...data);
  }
}
