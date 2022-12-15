import readInput from '../readInput.ts';

type Direction = 'U' | 'D' | 'R' | 'L';
type StepCount = number;
type Position = [number, number];
type Rope = {
  head: Position;
  tail: Position;
};

/**
 * Head and Tail always touching
 *
 * If the head is ever two steps directly up, down, left, or right from the tail,
 * the tail must also move one step in that direction so it remains close enough
 *
 * If the head and tail aren't touching and aren't in the same row or column,
 * the tail always moves one step diagonally
 *
 * After simulating the rope, you can count up all of the positions the tail
 * visited at least once
 */

const input = await readInput('day-9/input.txt');
const headMovements: [Direction, StepCount][] = parseInput(input);
const positionsVisited = processMovements(headMovements);
console.log(`file: bridge-rope.ts:26 - headMovements`, headMovements);

function processMovements(headMovements: [Direction, StepCount][]): Position[] {
  const rope: Rope = { head: [0, 0], tail: [0, 0] };
  const positionsVisited: Position[] = [[0, 0]];

  for (let index = 0; index < headMovements.length; index++) {
    let [direction, steps] = headMovements[index];

    for (steps; steps > 0; steps--) {
      const headMovement: Position = moveHead(rope, direction);
      const tailMovement: Position = followHead(rope);
      positionsVisited.push(rope.tail);
      rope.head = headMovement;
      rope.tail = tailMovement;
      console.log(rope);
    }
  }
  return positionsVisited;
}

function move(position: Position, direction: Direction, steps = 1) {
  const movementMapping = {
    U: ([x, y]: Position, steps = 1): Position => [x + steps, y],
    D: ([x, y]: Position, steps = 1): Position => [x - steps, y],
    R: ([x, y]: Position, steps = 1): Position => [x, y + steps],
    L: ([x, y]: Position, steps = 1): Position => [x, y - steps]
  } as const;

  if (direction in movementMapping) return movementMapping[direction](position, steps);
  throw new Error('Unexpected direction');
}

function moveHead(rope: Pick<Rope, 'head'>, direction: Direction): Position {
  return move(rope.head, direction);
}

function moveTail({ head, tail }: Rope): Position {
  const [xDiff, yDiff] = getPositionDiff({ head, tail });
  //FOR EACH DIFERENCE PUSH A MOVEMENT THEN PROCESS MOVEMENTS
  //xdif > 1 care Math.abs we need to known the sign to infer direction
}

function getPositionDiff({ head, tail }: Rope): Position {
  const [xHead, yHead] = head;
  const [xTail, yTail] = tail;
  const xDiff = Math.abs(xHead - xTail);
  const yDiff = Math.abs(yHead - yTail);
  return [xDiff, yDiff];
}

function followHead({ head, tail }: Rope): Position {
  if (isHeadTouchigTail({ head, tail })) return tail;
  return moveTail({ head, tail });
}

function isHeadTouchigTail({ head, tail }: Rope): boolean {
  if (head[0] === tail[0] && head[1] === tail[1]) return true;

  const [xDiff, yDiff] = getPositionDiff({ head, tail });
  if (xDiff === 1 && yDiff === 0) return true;
  if (xDiff === 0 && yDiff === 1) return true;
  if (xDiff === 1 && yDiff === 1) return true;

  return false;
}

function parseInput(input: string) {
  const rows = input.split('\n').map((row) => row.split(' '));
  const movemens = rows.map((row) => [row[0], Number(row[1])] as [Direction, StepCount]);
  return movemens;
}
