import { EditHistory } from "./edit-history.ts";

// ========================================
// TESTING
// ========================================

const history = new EditHistory("");

history.record("a");
history.record("ab");
history.record("abc");

// NOT 
// history.current();
// history.canUndo();

// UNDO twice
history.undo();
history.undo();

console.log(history.current, history.canUndo, history.canRedo);

// REDO once
history.redo();

console.log(history.current);

// RECORD a new value
history.record("abx");

console.log(history.current, history.canRedo);

// RUN YOUR TEST
// npx tsx src/index.ts

