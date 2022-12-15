import readInput from '../readInput.ts';

const input = await readInput('day-8/input.txt');
const treeGrid = parseInput(input);
const visibleTrees = getVisibleTrees(treeGrid);
console.log(`file: treetop-tree-house.ts:7 - visibleTrees`, visibleTrees);

function getVisibleTrees(treeGrid: number[][]) {
  let maxVisibility = 0;
  const visibilities: number[][] = [];
  for (let rowIndex = 1; rowIndex < treeGrid.length - 1; rowIndex++) {
    visibilities.push([]);
    for (let colIndex = 1; colIndex < treeGrid[rowIndex].length - 1; colIndex++) {
      const visibility = isTreeVisible(treeGrid, rowIndex, colIndex);
      maxVisibility = Math.max(maxVisibility, visibility);
    }
  }
  return maxVisibility;
}

function isTreeVisible(treeGrid: number[][], row: number, col: number): number {
  const currentTreeHeigth = treeGrid[row][col];
  const maxRowCount = treeGrid.length;
  const maxColCount = treeGrid[0].length;

  let blocked = false;
  let visibleCountFromBelow = 0;
  let visibleCountFromAbove = 0;
  let visibleCountFromRigth = 0;
  let visibleCountFromLeft = 0;

  let tmpRow = row + 1;
  while (tmpRow < maxRowCount && !blocked) {
    visibleCountFromBelow++;
    blocked = currentTreeHeigth <= treeGrid[tmpRow][col];
    tmpRow++;
  }

  blocked = false;
  tmpRow = row - 1;
  while (tmpRow > -1 && !blocked) {
    visibleCountFromAbove++;
    blocked = currentTreeHeigth <= treeGrid[tmpRow][col];
    tmpRow--;
  }

  blocked = false;
  let tmpCol = col + 1;
  while (tmpCol < maxColCount && !blocked) {
    visibleCountFromRigth++;
    blocked = currentTreeHeigth <= treeGrid[row][tmpCol];
    tmpCol++;
  }

  blocked = false;
  tmpCol = col - 1;
  while (tmpCol > -1 && !blocked) {
    visibleCountFromLeft++;
    blocked = currentTreeHeigth <= treeGrid[row][tmpCol];
    tmpCol--;
  }

  const totalCount =
    visibleCountFromAbove * visibleCountFromBelow * visibleCountFromLeft * visibleCountFromRigth;
  return totalCount;
}

function parseInput(input: string): number[][] {
  const rows = input.split('\n');
  const treeGrid: number[][] = [];

  for (let index = 0; index < rows.length; index++) {
    const trees = rows[index].split('').map(Number);
    treeGrid[index] = trees;
  }

  return treeGrid;
}
