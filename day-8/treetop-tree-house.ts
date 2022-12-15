import readInput from '../readInput.ts';

const input = await readInput('day-8/input.txt');
const treeGrid = parseInput(input);
console.log(`file: treetop-tree-house.ts:5 - treeGrid`, treeGrid);
const visibleTrees = getVisibleTrees(treeGrid);
console.log(`file: treetop-tree-house.ts:7 - visibleTrees`, visibleTrees);

function getVisibleTrees(treeGrid: number[][]) {
  let visibleTreeCount = 0;
  for (let rowIndex = 1; rowIndex < treeGrid.length - 1; rowIndex++) {
    for (let colIndex = 1; colIndex < treeGrid[rowIndex].length - 1; colIndex++) {
      const visible = isTreeVisible(treeGrid, rowIndex, colIndex);
      visibleTreeCount += visible;
    }
  }
  const edgeTreeCount = treeGrid.length * 2 + (treeGrid[0].length - 2) * 2;
  console.log(`file: treetop-tree-house.ts:19 - edgeTreeCount`, edgeTreeCount);
  return visibleTreeCount + edgeTreeCount;
}

function isTreeVisible(treeGrid: number[][], row: number, col: number): number {
  const currentTreeHeigth = treeGrid[row][col];
  const maxRowCount = treeGrid.length;
  const maxColCount = treeGrid[0].length;

  let visibleFromAbove = true;
  let visibleFromBelow = true;
  let visibleFromRigth = true;
  let visibleFromLeft = true;

  let tmpRow = row + 1;
  while (tmpRow < maxRowCount) {
    visibleFromBelow &&= currentTreeHeigth > treeGrid[tmpRow][col];
    tmpRow++;
  }
  if (visibleFromBelow) return 1;

  tmpRow = row - 1;
  while (tmpRow > -1) {
    visibleFromAbove &&= currentTreeHeigth > treeGrid[tmpRow][col];
    tmpRow--;
  }
  if (visibleFromAbove) return 1;

  let tmpCol = col + 1;
  while (tmpCol < maxColCount) {
    visibleFromRigth &&= currentTreeHeigth > treeGrid[row][tmpCol];
    tmpCol++;
  }
  if (visibleFromRigth) return 1;

  tmpCol = col - 1;
  while (tmpCol > -1) {
    visibleFromLeft &&= currentTreeHeigth > treeGrid[row][tmpCol];
    tmpCol--;
  }
  if (visibleFromLeft) return 1;

  return 0;
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
