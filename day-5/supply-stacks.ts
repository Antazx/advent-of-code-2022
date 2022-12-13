import readInput from '../readInput.ts';

type Stack = string[];
type Movement = {
  number: number;
  from: number;
  to: number;
};

const input = await readInput('day-5/input.txt');
const [stacks, movements] = parseInput(input);
const orderedStacks = transpose(stacks);
const result = moveStacks(orderedStacks, movements);
console.log(`file: supply-stacks.ts:14 - result`, result.join(''));

function moveStacks(stacks: Stack[], movements: Movement[]): string[] {
  for (let index = 0; index < movements.length; index++) {
    const { number, from, to } = movements[index];
    const crates = getCrates(stacks, from, number);
    setCrates(stacks, to, crates);
  }
  return getHeadItem(stacks);
}

function getHeadItem(stacks: Stack[]): string[] {
  const items: string[] = [];
  for (let index = 0; index < stacks.length; index++) {
    const headItem = stacks[index].filter((crate) => crate != ' ').shift();
    if (headItem) items.push(headItem);
  }
  return items;
}

function setCrates(stacks: Stack[], to: number, crates: string[]) {
  stacks[to] = [...crates.reverse(), ...stacks[to].filter((crate) => crate !== ' ')];
}

function getCrates(stacks: Stack[], from: number, number: number): string[] {
  const crates: string[] = [];
  for (let index = 0; index < stacks[from].length && number > 0; index++) {
    if (stacks[from][index] !== ' ') {
      crates.push(stacks[from][index]);
      stacks[from][index] = ' ';
      number--;
    }
  }
  return crates;
}

function transpose(stacks: Stack[]): Stack[] {
  const rows = stacks.length;
  const cols = stacks[0].length;
  const transposed: Stack[] = [];
  for (let colIndex = 0; colIndex < cols; colIndex++) {
    transposed[colIndex] = Array(rows);
  }
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      transposed[colIndex][rowIndex] = stacks[rowIndex][colIndex];
    }
  }
  return transposed;
}

function parseInput(input: string): [Stack[], Movement[]] {
  const inputRows = input.split('\n');
  const stackEndRow = inputRows.findIndex((row) => row.startsWith('move'));
  const stacks = rowsToStack(inputRows.slice(0, stackEndRow - 2));
  const movements = inputRows.slice(stackEndRow).map(toMovement);
  return [stacks, movements];
}

function toMovement(row: string): Movement {
  const match = row.match(/\d+/g);
  if (!Array.isArray(match) || match.length !== 3) throw new Error('Cant map movement');
  const [number, from, to] = match.map((str) => Number(str));
  return { number, from: from - 1, to: to - 1 };
}

function rowsToStack(rows: string[]): Stack[] {
  const stacks: string[][] = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const rowElements = rows[rowIndex].split('');
    stacks[rowIndex] = [];
    for (let colIndex = 4; colIndex < rowElements.length + 3; colIndex += 4) {
      const [_o, crate, _e, _s] = rowElements.slice(colIndex - 4, colIndex);
      stacks[rowIndex].push(crate);
    }
  }
  return stacks as Stack[];
}
