import readInput from '../readInput.ts';

type Command = string;
type Output = string;
type TerminalOutput = [Command, Output[]][];

const input = await readInput('day-7/input.txt');
const commandAndOutputs: TerminalOutput = parseInput(input);
const fileTree = processComands(commandAndOutputs);

function processComands(commandAndOutputs: TerminalOutput): Record<string, string[]> {
  let currentPath = '';
  let tree: Record<string, string[]> = {};

  for (let index = 0; index < commandAndOutputs.length; index++) {
    const [commands, outputs] = commandAndOutputs[index];
    const [command, args] = commands.split(' ');
    if (command === 'cd') currentPath = cd(currentPath, args);
    if (command === 'ls') tree = ls(tree, currentPath, outputs);
  }

  return tree;
}

function ls(
  tree: Record<string, string[]>,
  currentPath: string,
  outputs: Output[]
): Record<string, string[]> {
  tree[currentPath] = outputs.map((output) =>
    output.startsWith('dir')
      ? output.replace('dir ', `${currentPath}/`).replace('//', '/')
      : output.split(' ')[0]
  );
  return tree;
}

function cd(currentPath: string, argument: string) {
  if (currentPath === '') return argument;
  if (argument === '/') return argument;
  if (argument !== '..') return nextPath(currentPath, argument);
  if (argument === '..') return previousPath(currentPath);

  throw new Error('Argument not recogniced');
}

function nextPath(currentPath: string, argument: string): string {
  const paths = currentPath.split('/');
  return paths.filter((path) => path === '').length === 2
    ? `/${argument}`
    : `${currentPath}/${argument}`;
}

function previousPath(currentPath: string): string {
  const prevDirs = currentPath.split('/');
  return prevDirs.length === 2 ? '/' : prevDirs.slice(0, -1).join('/');
}

function parseInput(input: string): TerminalOutput {
  const inputLines = input.split('\n');
  const commandAndOutputs: TerminalOutput = [];
  let commandIndex = -1;

  for (let index = 0; index < inputLines.length; index++) {
    if (inputLines[index].startsWith('$')) {
      commandIndex++;
      commandAndOutputs[commandIndex] = [inputLines[index].replace('$ ', ''), []];
    } else {
      commandAndOutputs[commandIndex][1].push(inputLines[index]);
    }
  }
  return commandAndOutputs;
}
