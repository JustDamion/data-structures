class Node {
  left = null;
  right = null;

  constructor(data) {
    this.data = data;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(array) {
    const set = new Set(array);

    array = [...set];
    array = array.sort((a, b) => a - b);

    return this.arrayToTree(array, 0, array.length - 1);
  }

  arrayToTree(array, start, end) {
    if (start > end) return null;

    const mid = start + Math.floor((end - start) / 2);
    const root = new Node(array[mid]);

    root.left = this.arrayToTree(array, start, mid - 1);
    root.right = this.arrayToTree(array, mid + 1, end);

    return root;
  }

  includes(value, node = this.root) {
    if (node === null) return false;

    if (value === node.data) return true;

    if (value > node.data) return this.includes(value, node.right);

    return this.includes(value, node.left);
  }

  insert(value) {
    const tempNode = new Node(value);

    if (this.root === null) {
      this.root = tempNode;
      return tempNode;
    }

    let current = this.root;

    while (current !== null) {
      if (current.data === value) {
        return current;
      } else if (current.data > value && current.left !== null) {
        current = current.left;
      } else if (current.data < value && current.right !== null) {
        current = current.right;
      } else {
        break;
      }
    }

    if (current.data > value) {
      current.left = tempNode;
      return current.left;
    } else {
      current.right = tempNode;
      return current.right;
    }
  }

  deleteItem(value, node = this.root) {
    if (node.data > value) {
      node.left = this.deleteItem(value, node.left);
    } else if (node.data < value) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      let successor = node.right;
      while (successor !== null && successor.left !== null) {
        successor = successor.left;
      }

      node.data = successor.data;
      node.right = this.deleteItem(successor.data, node.right);
    }

    return node;
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("Callback function is required!");

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.pop();
      node.data = callback(node.data)

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("Callback function is required!");
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
tree.deleteItem(67);
console.log(tree.includes(6345));
tree.levelOrderForEach((data) => data + 2)
prettyPrint(tree.root);
