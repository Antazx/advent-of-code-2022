import readInput from '../readInput.ts';

type Compartment = 'string';
type Rucksack = [Compartment, Compartment];
type ElfGroup = {
  badge: string;
  rucksacks: [Rucksack, Rucksack, Rucksack];
};

const UPPERCASE_CHARS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const LOWERCASE_CHARS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

const ITEM_VALUES = { ...charToValue(LOWERCASE_CHARS), ...charToValue(UPPERCASE_CHARS, 27) };

const input = await readInput('Day 4/input.txt');
const rucksackList: Rucksack[] = input
  .split('\n')
  .map((rucksack) => [
    rucksack.slice(0, rucksack.length / 2) as Compartment,
    rucksack.slice(rucksack.length / 2) as Compartment
  ]);
let elfGroups: ElfGroup[] = getElfGroups(rucksackList);
elfGroups = determineBadge(elfGroups);
const itemValueList = elfGroups.map((group) => group.badge).map(itemToValue);
const result = itemValueList.reduce((acc, curr) => acc + curr, 0);
console.log('🚀 ~ file: rucksack-reorganization.ts:83 ~ result', result);

function itemToValue(item: string) {
  const index = item as keyof typeof ITEM_VALUES;
  return ITEM_VALUES[index];
}

function charToValue(charList: string[], outset = 1) {
  return charList.reduce((acc, curr, index) => ({ ...acc, [curr]: index + outset }), {});
}

function findCommonItem(rucksack: Rucksack): string {
  const [firstCompartment, secondCompartment] = rucksack;
  const firstItemList = firstCompartment.split('');
  const secondItemList = secondCompartment.split('');

  if (firstItemList.length !== secondItemList.length)
    throw new Error(`Compartments doesn't have same amount of items`);

  for (let itemIndex1 = 0; itemIndex1 < firstItemList.length; itemIndex1++) {
    for (let itemIndex2 = 0; itemIndex2 < secondItemList.length; itemIndex2++) {
      const [item1, item2] = [firstItemList[itemIndex1], secondItemList[itemIndex2]];
      if (item1 === item2) return item1;
    }
  }

  throw new Error(`Compartments doesn't have common items`);
}

function getElfGroups(rucksackList: Rucksack[]): ElfGroup[] {
  const elfGroups: ElfGroup[] = [];
  const exactGroups = rucksackList.length % 3 === 0;
  if (!exactGroups) throw new Error('Cant get groups of 3 elfs');

  for (let index = 2; index < rucksackList.length; index++) {
    const rucksackIndex = index + 1;
    if (rucksackIndex % 3 === 0) {
      const rucksacks = [rucksackList[index - 2], rucksackList[index - 1], rucksackList[index]] as [
        Rucksack,
        Rucksack,
        Rucksack
      ];
      const elfGroup: ElfGroup = { badge: '', rucksacks };
      elfGroups.push(elfGroup);
    }
  }

  return elfGroups;
}

function determineBadge(elfGroups: ElfGroup[]): ElfGroup[] {
  for (let index = 0; index < elfGroups.length; index++) {
    const { rucksacks } = elfGroups[index];
    elfGroups[index].badge = getBadge(rucksacks);
  }

  return elfGroups;
}

function getBadge(rucksacks: Rucksack[]): string {
  const joinRucksac = rucksacks.map((rucksack) => rucksack.join(''));
  const mapItems: Record<string, boolean[]> = {};

  for (let rucksackIndex = 0; rucksackIndex < joinRucksac.length; rucksackIndex++) {
    const items = joinRucksac[rucksackIndex].split('');
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const item = items[itemIndex];
      if (item in mapItems) {
        mapItems[item][rucksackIndex] = true;
      } else {
        mapItems[item] = initValues(rucksackIndex);
      }
      if (mapItems[item].filter((item) => item === true).length === 3) return item;
    }
  }

  throw new Error('Cant get badge');
}

function initValues(rucksackIndex: number): boolean[] {
  const values: boolean[] = [];
  values.length = 3;
  values.fill(false);
  values[rucksackIndex] = true;
  return values;
}
