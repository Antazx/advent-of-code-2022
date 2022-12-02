const itemCalories: number[][] = [
  [1000, 2000, 3000],
  [4000],
  [5000, 6000],
  [7000, 8000, 9000],
  [10000]
];

const greatest = (number1, number2) => number2 - number1;
const calories = itemCalories.map((items) => items.reduce((acc, curr) => acc + curr, 0), []);
const mostCalories = calories.sort((a, b) => b - a).shift();
console.log(mostCalories);
