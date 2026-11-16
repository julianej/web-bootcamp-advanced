// src/main.ts creates an EditHistory 
// and calls record on every input event of the text input, 
// so every keystroke is one step

import { EditHistory } from "./edit-history.js";

// Get HTML elements (Vanilla JS with TYPESCRIPT <HTMLInputElement> Annotation)

// ========================================
// DOM ELEMENTS
// ========================================

function getElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing element: ${selector}`);
  }

  return element;
}

const input = getElement<HTMLInputElement>("#text-input");
const currentValue = getElement<HTMLSpanElement>("#current-value");
const undoButton = getElement<HTMLButtonElement>("#undo-button");
const redoButton = getElement<HTMLButtonElement>("#redo-button");

// ========================================
// EDIT HISTORY
// ========================================

const history = new EditHistory("");

// ========================================
// INPUT EVENT
// ========================================

input.addEventListener("input", () => {
  history.record(input.value);
  currentValue.textContent = history.current;
});

// ========================================
// UNDO EVENT
// ========================================

undoButton.addEventListener("click", () => {
  history.undo();

  input.value = history.current;
  currentValue.textContent = history.current;
});

// ========================================
// REDO EVENT
// ========================================

redoButton.addEventListener("click", () => {
  history.redo();

  input.value = history.current;
  currentValue.textContent = history.current;
});
