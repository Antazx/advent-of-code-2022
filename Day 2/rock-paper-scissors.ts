import readFile from '../readInput.ts';

const SCORES = {
  LOSS: 0,
  DRAW: 3,
  WIN: 6
};

enum PLAY {
  ROCK = 'Rock',
  PAPER = 'Paper',
  SCISSORS = 'Scissors'
}

const OPPONENT_OPTIONS = {
  A: [PLAY.ROCK, 1],
  B: [PLAY.PAPER, 2],
  C: [PLAY.SCISSORS, 3]
};

const PLAYER_OPTIONS = {
  X: [PLAY.ROCK, 1],
  Y: [PLAY.PAPER, 2],
  Z: [PLAY.SCISSORS, 3]
};

const win = (value: number) => value + SCORES.WIN;
const loss = (value: number) => value + SCORES.LOSS;
const draw = (value: number) => value + SCORES.DRAW;

function getResults(opponent: keyof typeof OPPONENT_OPTIONS, player: keyof typeof PLAYER_OPTIONS) {
  const opponentPlay = OPPONENT_OPTIONS[opponent] as [PLAY, number];
  const playerPlay = PLAYER_OPTIONS[player] as [PLAY, number];
  return computePlays(opponentPlay, playerPlay);
}

function computePlays(first: [PLAY, number], second: [PLAY, number]) {
  const [firstPlay, firstValue] = first;
  const [secondPlay, secondValue] = second;

  if (firstPlay === secondPlay) return [draw(firstValue), draw(secondValue)];

  if (firstPlay === PLAY.ROCK && secondPlay === PLAY.SCISSORS)
    return [win(firstValue), loss(secondValue)];

  if (firstPlay === PLAY.ROCK && secondPlay === PLAY.PAPER)
    return [loss(firstValue), win(secondValue)];

  if (firstPlay === PLAY.PAPER && secondPlay === PLAY.ROCK)
    return [win(firstValue), loss(secondValue)];

  if (firstPlay === PLAY.PAPER && secondPlay === PLAY.SCISSORS)
    return [loss(firstValue), win(secondValue)];

  if (firstPlay === PLAY.SCISSORS && secondPlay === PLAY.PAPER)
    return [win(firstValue), loss(secondValue)];

  if (firstPlay === PLAY.SCISSORS && secondPlay === PLAY.ROCK)
    return [loss(firstValue), win(secondValue)];

  throw new Error('Cant compute plays');
}

const input = await readFile('Day 2/input.txt');
const strategyList = input.split('\n').map((line) => line.split(' '));
const strategyResults = strategyList.map((round) => {
  const opponent = round[0] as keyof typeof OPPONENT_OPTIONS;
  const player = round[1] as keyof typeof PLAYER_OPTIONS;
  return getResults(opponent, player);
});

let opponentTotal = 0;
let playerTotal = 0;

for (const roundResult of strategyResults) {
  opponentTotal += roundResult[0];
  playerTotal += roundResult[1];
}

console.log('🚀 ~ file: rock-paper-scissors.ts:88 ~ opponentTotal', opponentTotal);
console.log('🚀 ~ file: rock-paper-scissors.ts:85 ~ playerTotal', playerTotal);
