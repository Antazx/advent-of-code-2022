import readInput from '../readInput.ts';

type Range = { start: number; end: number };
type Assignment = [Range, Range];

const inputString = await readInput('day-4/input.txt');
const assignments: Assignment[] = parseInput(inputString);
const contained = assignments.map(checkAssignment);
const result = contained.filter((isContained) => isContained === true).length;
console.log('🚀 ~ file: camp-cleanup.ts:10 ~ result', result);

function parseInput(inputString: string): Assignment[] {
  const assignments: Assignment[] = [];
  const rows = inputString.split('\n');
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index].split(',');
    assignments.push(toAssignment(row));
  }
  return assignments;
}

function checkAssignment(assignment: Assignment): boolean {
  const [range1, range2] = assignment;
  return overlapsRange(range2, range1);
}

function containsRange(range1: Range, range2: Range): boolean {
  return range1.start <= range2.start && range1.end >= range2.end;
}

function overlapsRange(range1: Range, range2: Range): boolean {
  return !(range1.end < range2.start || range1.start > range2.end);
}

function toAssignment(stringList: string[]): Assignment {
  return stringList.map(toRange) as Assignment;
}

function toRange(input: string): Range {
  const [startString, endString] = input.split('-');
  return {
    start: Number(startString),
    end: Number(endString)
  };
}
