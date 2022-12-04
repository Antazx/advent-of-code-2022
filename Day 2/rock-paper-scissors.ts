import readInput from '../readInput.ts';

const Choose = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors'
} as const;

const Values = {
  Rock: 1,
  Paper: 2,
  Scissors: 3
} as const;

const Result = {
  Loss: 0,
  Draw: 3,
  Win: 6
} as const;

const input = await readInput('Day 2/input.txt');
const strategyList = input.split('\n').map((line) => line.split(' '));
const strategyMap = strategyList.map(([opponent, player]) => [
  Choose[opponent as keyof typeof Choose],
  Choose[player as keyof typeof Choose]
]);

let opponentTotal = 0;
let playerTotal = 0;

strategyMap.forEach(([opponent, player]) => {
  const [oResult, pResult] = getChooseResult(opponent, player);
  opponentTotal += oResult + Values[opponent];
  playerTotal += pResult + Values[player];
});

console.log('🚀 ~ opponentTotal', opponentTotal);
console.log('🚀 ~ playerTotal', playerTotal);

function getChooseResult(
  opponent: keyof typeof Values,
  player: keyof typeof Values
): [number, number] {
  if (opponent === player) return [Result.Draw, Result.Draw];
  if (opponent === 'Rock' && player === 'Scissors') return [Result.Win, Result.Loss];
  if (opponent === 'Rock' && player === 'Paper') return [Result.Loss, Result.Win];
  if (opponent === 'Paper' && player === 'Rock') return [Result.Win, Result.Loss];
  if (opponent === 'Paper' && player === 'Scissors') return [Result.Loss, Result.Win];
  if (opponent === 'Scissors' && player === 'Paper') return [Result.Win, Result.Loss];
  if (opponent === 'Scissors' && player === 'Rock') return [Result.Loss, Result.Win];

  throw new Error(`Can't get winner`);
}
