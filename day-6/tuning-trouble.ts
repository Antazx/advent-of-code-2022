import readInput from '../readInput.ts';

const UNIQUE_CHAR_COUNT = 14;
const input = await readInput('day-6/input.txt');
const [processedCount, message] = findMarker(input.split(''));
console.log(`file: tuning-trouble.ts:6 - marker`, processedCount, message);

function findMarker(input: string[]): [number, string] {
  for (let index = UNIQUE_CHAR_COUNT; index < input.length; index++) {
    const candidate = input.slice(index - UNIQUE_CHAR_COUNT, index);
    const uniqueChars = [...new Set(candidate)];
    if (uniqueChars.length === UNIQUE_CHAR_COUNT) return [index, candidate.join('')];
  }
  throw new Error('Cant find marker in sequence');
}
