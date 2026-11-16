
// Class – creates objects 
// and defines behaviour

export class EditHistory {

// A class can define properties, methods, constructors and getters.
// properties
// constructor
// methods
// getters
  private currentValue: string;

  private back: string[] = [];
  private forward: string[] = [];

  constructor(initialValue: string) {
    this.currentValue = initialValue;
  }

//   A class body contains constructors, methods, getters, setters, 
//   and properties — not standalone variable declarations.
//   NOT: const history = new EditHistory("Hello");

    // record(value) pushes the current value onto back, 
    // makes value the current value, and empties forward
    record(value: string): void {
        this.back.push(this.currentValue);
        this.currentValue = value;
        this.forward = [];
    }

    // undo() pushes the current value 
    // onto forward and makes the value popped 
    // from back the current value. If back is empty, it does nothing.
    undo(): void {
        if (this.back.length === 0) return;

        this.forward.push(this.currentValue);
        // WRONG this.back.pop(this.currentValue):
        this.currentValue = this.back.pop()!;
     }

     // redo() works the other way round: 
     // it pushes the current value onto back and makes the value popped from forward the current value. If forward is empty, it does nothing.
     redo():void {
        if (this.forward.length === 0) {
            return; }
        this.back.push(this.currentValue);
        this.currentValue = this.forward.pop()!;
     }
     // The getters current, canUndo, and canRedo 
     // return the current value and whether undo or redo is possible
    // Returns the current value

    get current(): string {
    return this.currentValue;
    }

    // Returns whether undo is possible
    get canUndo(): boolean {
    return this.back.length > 0;
    }

    // Returns whether redo is possible
    get canRedo(): boolean {
    return this.forward.length > 0;
    }
    
} 
