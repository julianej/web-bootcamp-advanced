
interface HistoryNode {
  value: string;
  previous: HistoryNode | null;
  next: HistoryNode | null;
}

// in src/linked-edit-history.ts has the 
// same constructor, 
// methods, 
// and getters as EditHistory

// CLASS, Defines how an object is created 
// and what it can do.

export class LinkedEditHistory {
  private currentNode: HistoryNode;

  constructor(initialValue: string) {
    this.currentNode = {
      value: initialValue,
      previous: null,
      next: null,
    };
  }

 // record appends a new node after the current one, 
  record(value: string): void {
    const newNode: HistoryNode = {
      value,
      previous: this.currentNode,
      next: null,
    };

    // Remove the future history.
    this.currentNode.next = null;

    // Connect the new node.
    this.currentNode.next = newNode;

    // Move the current reference forward.
    this.currentNode = newNode;
  }

  undo(): void {
    if (this.currentNode.previous !== null) {
      this.currentNode = this.currentNode.previous;
    }
  }

  redo(): void {
    if (this.currentNode.next !== null) {
      this.currentNode = this.currentNode.next;
    }
  }

  get current(): string {
    return this.currentNode.value;
  }

  get canUndo(): boolean {
    return this.currentNode.previous !== null;
  }

  get canRedo(): boolean {
    return this.currentNode.next !== null;
  }
}
