import readInput from '../readInput.ts';

type Direction = 'U' | 'D' | 'R' | 'L';
type StepCount = number;
type Position = [number, number];
type Rope = Position[];

const input = await readInput('day-9/input.txt');
const headMovements: [Direction, StepCount][] = parseInput(input);
const positionsVisited = processMovements(headMovements);
console.log(`file: bridge-rope.ts:31 - positionsVisited`, positionsVisited.size + 1);

function processMovements(headMovements: [Direction, StepCount][]): Set<string> {
  const rope: Rope = Array(10).fill([0, 0]);
  let positionsVisited: Set<string> = new Set<string>();

  for (let index = 0; index < headMovements.length; index++) {
    const [direction, steps] = headMovements[index];
    for (let stepIndex = 0; stepIndex < steps; stepIndex++) {
      const headMovement: Position = moveHead(rope[0], direction);
      rope[0] = headMovement;

      for (let ropeIndex = 1; ropeIndex < rope.length - 1; ropeIndex++) {
        const [ropeIndexPosition] = followHead(rope[ropeIndex - 1], rope[ropeIndex]);
        rope[ropeIndex] = ropeIndexPosition;
      }

      const [tailPosition, lastTailPositions] = followHead(
        rope[rope.length - 2],
        rope[rope.length - 1],
        positionsVisited
      );
      rope[rope.length - 1] = tailPosition;
      if (lastTailPositions)
        positionsVisited = new Set([...positionsVisited, ...lastTailPositions]);
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

function moveHead(rope: Position, direction: Direction): Position {
  return move(rope, direction);
}

function moveTail(
  head: Position,
  tail: Position,
  positionsVisited?: Set<string>
): [Position, Set<string> | undefined] {
  const movements: [Direction, StepCount][] = [];
  const [xDiff, yDiff] = getPositionDiff(head, tail);

  let needDiagonal = Math.abs(xDiff) >= 1 && Math.abs(yDiff) >= 1;

  if (xDiff > 0) movements.push(['U', 1]);
  if (xDiff < 0) movements.push(['D', 1]);
  if (yDiff > 0) movements.push(['R', 1]);
  if (yDiff < 0) movements.push(['L', 1]);

  let currentPosition = tail;
  for (const movement of movements) {
    const [direction, steps] = movement;
    currentPosition = move(currentPosition, direction, steps);
    if (!needDiagonal && positionsVisited)
      positionsVisited.add(`${currentPosition[0]}-${currentPosition[1]}`);
    needDiagonal = false;
  }

  return [currentPosition, positionsVisited];
}

function getPositionDiff(head: Position, tail: Position): Position {
  const [xHead, yHead] = head;
  const [xTail, yTail] = tail;
  return [xHead - xTail, yHead - yTail];
}

function followHead(
  head: Position,
  tail: Position,
  positionsVisited?: Set<string>
): [Position, Set<string> | undefined] {
  const needToMoveTail = !isHeadTouchigTail(head, tail);
  return needToMoveTail ? moveTail(head, tail, positionsVisited) : [tail, positionsVisited];
}

function isHeadTouchigTail(head: Position, tail: Position): boolean {
  if (head[0] === tail[0] && head[1] === tail[1]) return true;

  let [xDiff, yDiff] = getPositionDiff(head, tail);
  xDiff = Math.abs(xDiff);
  yDiff = Math.abs(yDiff);

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
