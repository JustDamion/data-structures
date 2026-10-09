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
    array = [...new Set(array.sort((a, b) => a - b))];
    console.log(array);
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

  treeToArray(node = this.root) {
    const arr = [];
    const queue = [node];

    while (queue.length > 0) {
      const node = queue.pop();
      arr.push(node.data);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    return arr;
  }

  includes(value, node = this.root) {
    if (node === null) return false;

    if (value === node.data) return true;

    if (value > node.data) return this.includes(value, node.right);

    return this.includes(value, node.left);
  }

  find(value, node = this.root) {
    if (node === null) return false;

    if (value === node.data) return node;

    if (value > node.data) return this.find(value, node.right);

    return this.find(value, node.left);
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
      node.data = callback(node.data);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback function is required!");

    if (node.left) this.inOrderForEach(callback, node.left);
    node.data = callback(node.data);
    if (node.right) this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback function is required!");

    node.data = callback(node.data);
    if (node.left) this.inOrderForEach(callback, node.left);
    if (node.right) this.inOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback function is required!");

    if (node.left) this.inOrderForEach(callback, node.left);
    if (node.right) this.inOrderForEach(callback, node.right);
    node.data = callback(node.data);
  }

  height(value) {
    if (typeof value !== "object") value = this.find(value);
    if (!value) return 0;

    let leftHeight = this.height(value.left);
    let rightHeight = this.height(value.right);

    return leftHeight >= rightHeight ? leftHeight + 1 : rightHeight + 1;
  }

  depth(value, node = this.root, depth = 0) {
    if (node === null) return;
    if (value === node.data) return depth;

    if (value > node.data) return this.depth(value, node.right, (depth += 1));

    return this.depth(value, node.left, (depth += 1));
  }

  isBalanced(node = this.root) {
    function dfs(node) {
      if (!node) return [true, 0];

      const leftBalance = dfs(node.left);
      const rightBalance = dfs(node.right);

      const balanced =
        leftBalance[0] &&
        rightBalance[0] &&
        Math.abs(leftBalance[1] - rightBalance[1]) <= 1;

      return [balanced, 1 + Math.max(leftBalance[1], rightBalance[1])];
    }

    return dfs(node)[0];
  }

  rebalance() {
    const arr = this.treeToArray();
    this.root = this.buildTree(arr);
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

