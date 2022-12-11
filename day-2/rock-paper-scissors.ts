import readInput from '../readInput.ts';

const Choose = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors'
} as const;

const EndResults = {
  X: 'Loss',
  Y: 'Draw',
  Z: 'Win'
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
const strategyMap = strategyList.map(
  ([opponent, player]): [keyof typeof Values, keyof typeof Result] => [
    Choose[opponent as keyof typeof Choose],
    EndResults[player as keyof typeof EndResults]
  ]
);

let opponentTotal = 0;
let playerTotal = 0;

strategyMap.forEach(([opponent, endResult]) => {
  const player = getPlayerChoice(opponent, endResult);
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

function getPlayerChoice(
  opponent: keyof typeof Values,
  endResult: keyof typeof Result
): keyof typeof Values {
  if (endResult === 'Draw') return opponent;
  if (endResult === 'Loss' && opponent === 'Paper') return 'Rock';
  if (endResult === 'Loss' && opponent === 'Rock') return 'Scissors';
  if (endResult === 'Loss' && opponent === 'Scissors') return 'Paper';
  if (endResult === 'Win' && opponent === 'Paper') return 'Scissors';
  if (endResult === 'Win' && opponent === 'Rock') return 'Paper';
  if (endResult === 'Win' && opponent === 'Scissors') return 'Rock';

  throw new Error('Cant get player choice');
}
