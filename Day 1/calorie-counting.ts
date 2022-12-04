import readInput from '../readInput.ts';

const inputString = await readInput('Day 1/input.txt');
const input = inputString
  .split('\n\n')
  .map((line) => line.split('\n').map((element) => Number(element)));

const itemCalories: number[][] = input;
const calories = itemCalories.map((items) => items.reduce((acc, curr) => acc + curr, 0), []);
const [first, second, third, ..._loosers] = calories.sort((a, b) => b - a);
const result = first + second + third;
console.log('🚀 ~ file: calorie-counting.ts:12 ~ result', result);
