import { buildRange, delay, mergeSortedArray, swap, swapPart } from './utils';

const INTERVAL = 100;

export const visualBubbleSort = async (
  list: number[],
  setList: (l: number[]) => void,
  setCurrent: (s: Set<number>) => void
): Promise<void> => {
  const result = [...list];
  const size = result.length;

  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      setCurrent(new Set([j, j + 1]));
      await delay(INTERVAL);
      if (result[j] > result[j + 1]) {
        swap(j, j + 1, result);
        setList([...result]);
        await delay(INTERVAL);
      }
    }
  }

  setCurrent(new Set());
};

export const visualMergeSort = async (
  list: number[],
  setList: (l: number[]) => void,
  setCurrent: (s: Set<number>) => void
): Promise<void> => {
  const [sorted] = await mergeSort(
    list,
    [...list],
    setList,
    setCurrent,
    0,
    list.length - 1
  );
  setList(sorted);
  setCurrent(new Set());
};

export const mergeSort = async (
  list: number[],
  original: number[],
  setList: (l: number[]) => void,
  setCurrent: (s: Set<number>) => void,
  startIndex: number,
  endIndex: number
): Promise<[number[], number[]]> => {
  if (list.length <= 1) {
    return [list, original];
  }

  const mid = Math.floor(list.length / 2);

  const [left, ori] = await mergeSort(
    list.slice(0, mid),
    original,
    setList,
    setCurrent,
    startIndex,
    mid
  );

  const [right, ori2] = await mergeSort(
    list.slice(mid),
    ori,
    setList,
    setCurrent,
    startIndex + mid,
    startIndex + endIndex
  );

  setCurrent(new Set(buildRange(startIndex, endIndex)));
  await delay(INTERVAL);

  const sorted = mergeSortedArray(left, right, startIndex, endIndex);

  const modified = swapPart(ori2, startIndex, sorted);
  setList(modified);
  await delay(INTERVAL);

  return [sorted, modified];
};
