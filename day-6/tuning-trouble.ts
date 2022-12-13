import readInput from '../readInput.ts';

const input = await readInput('day-6/input.txt');
const processedCount = findMarker(input.split(''));
console.log(`file: tuning-trouble.ts:6 - marker`, processedCount);

function findMarker(input: string[]): number {
  for (let index = 4; index < input.length; index++) {
    const candidate = input.slice(index - 4, index);
    if ([...new Set(candidate)].length === 4) return index;
  }
  throw new Error('Cant find marker in sequence');
}
