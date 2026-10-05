export default class LinkedList {
  constructor(value = null) {
    this.headNode = new Node(value, null);
  }

  append(value) {
    if (this.headNode === null) {
      this.prepend(value);
    } else {
      let temp = this.headNode;

      while (temp.nextNode !== null) {
        temp = temp.nextNode;
      }

      temp.nextNode = new Node(value, null);
    }
  }

  prepend(value) {
    const temp = new Node(value, this.headNode);
    this.headNode = temp;
  }

  size() {
    let size = 0;
    let temp = this.headNode;

    while (temp.nextNode !== null) {
      temp = temp.nextNode;
      size++;
    }

    return size;
  }

  head() {
    if (this.headNode !== null) {
      return this.headNode;
    } else {
      return undefined;
    }
  }

  tail() {
    if (this.headNode === null) {
      return undefined;
    } else {
      let temp = this.headNode;

      while (temp.nextNode !== null) {
        temp = temp.nextNode;
      }

      return temp.value;
    }
  }

  at(index) {
    let temp = this.headNode;

    for (let i = 0; i < index; i++) {
      temp = temp.nextNode;

      if (temp === null) {
        return undefined;
      }
    }

    return temp;
  }

  pop() {
    if (this.headNode === null) {
      return undefined;
    } else {
      const temp = this.headNode;
      this.headNode = this.headNode.nextNode || null;
      return temp.value;
    }
  }

  contains(value) {
    let temp = this.headNode;

    while (temp !== null) {
      if (temp.value === value) {
        return true;
      }

      temp = temp.nextNode;
    }

    return false;
  }

  findIndex(value) {
    let temp = this.headNode;
    let index = 0;

    while (temp !== null) {
      if (temp.value === value) {
        return index;
      }

      temp = temp.nextNode;
      index++;
    }

    return -1;
  }

  toString() {
    let result = "";
    let temp = this.headNode;

    if (temp === null) return result;

    while (temp.nextNode !== null) {
      result += `( ${temp.value} ) -> `;
      temp = temp.nextNode;
    }

    result += `( ${temp.value} ) -> `;

    result += "null";
    return result;
  }

  insertAt(index, ...values) {
    if (index < 0) throw new RangeError();

    let temp = new Node(null, this.headNode);
    let nextNode = temp.nextNode;

    for (let i = 0; i < index; i++) {
      if (temp.nextNode === null) throw new RangeError();

      temp = nextNode;
      nextNode = temp.nextNode;
    }

    for (const value of values) {
      temp.nextNode = new Node(value);
      temp = temp.nextNode;

      if (nextNode === this.headNode) this.headNode = temp;
    }

    temp.nextNode = nextNode;
  }

  removeAt(index) {
    if (index < 0) throw new RangeError();

    let previousNode = new Node(null, this.headNode);
    let currentNode = this.headNode;
    let nextNode = currentNode.nextNode;

    for (let i = 0; i < index; i++) {
      if (currentNode.nextNode === null) throw new RangeError();

      previousNode = currentNode;
      currentNode = nextNode;
      nextNode = currentNode.nextNode;
    }

    if (currentNode === this.headNode) {
      this.headNode = nextNode;
      currentNode.nextNode = null;
    } else {
      currentNode.nextNode = null;
      previousNode.nextNode = nextNode;
    }

    console.log(currentNode);
  }
}

class Node {
  constructor(value, nextNode) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
