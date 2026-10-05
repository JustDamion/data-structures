import LinkedList from "./linked-list.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
    this.used = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  resize() {
    this.capacity *= 2;
    const temp = this.buckets;

    this.buckets = new Array(this.capacity);

    for (const entry of temp) {
      let head = entry ? entry.head() : null;

      while (head !== null) {
        this.set(head.value[0], head.value[1]);
        head = head.nextNode;
      }
    }
  }

  set(key, value) {
    if (this.used >= this.capacity * this.loadFactor) {
      this.resize();
    }

    const index = this.hash(key);
    let head = this.buckets[index] ? this.buckets[index].head() : null;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let keyExist = false;
    let temp = head;

    while (temp !== null && keyExist === false) {
      if (temp.value[0] === key) {
        temp.value[1] = value;
        keyExist = true;
      }

      temp = head.nextNode;
    }

    if (head != null && keyExist === false) {
      this.buckets[index].prepend([key, value]);
    } else {
      this.used++;
      this.buckets[index] = new LinkedList([key, value]);
    }
  }

  get(key) {
    const index = this.hash(key);
    let head = this.buckets[index] ? this.buckets[index].head() : null;

    while (head != null) {
      if (head.value[0] === key) {
        return head.value[1];
      }

      head = head.nextNode;
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);
    let head = this.buckets[index] ? this.buckets[index].head() : null;

    while (head != null) {
      if (head.value[0] === key) {
        return true;
      }

      head = head.nextNode;
    }

    return false;
  }

  remove(key) {
    if (this.has(key)) {
      const index = this.hash(key);
      delete this.buckets[index];
      return true;
    } else {
      return false;
    }
  }

  length() {
    const result = this.buckets.filter((element) => element !== undefined);
    return result.length;
  }

  clear() {
    this.buckets = new Array(16);
  }

  keys() {
    const result = [];

    for (const elem of this.buckets) {
      let head = elem ? elem.head() : null;

      if (head) {
        while (head !== null) {
          result.push(head.value[0]);
          head = head.nextNode;
        }
      }
    }

    return result;
  }

  values() {
    const result = [];

    for (const elem of this.buckets) {
      let head = elem ? elem.head() : null;

      if (head) {
        while (head !== null) {
          result.push(head.value[1]);
          head = head.nextNode;
        }
      }
    }

    return result;
  }

  entries() {
    const result = [];

    for (const elem of this.buckets) {
      let head = elem ? elem.head() : null;

      if (head) {
        while (head !== null) {
          result.push([head.value[0], head.value[1]]);
          head = head.nextNode;
        }
      }
    }

    return result;
  }
}
