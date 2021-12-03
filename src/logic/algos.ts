import { delay, swap } from './utils';

const INTERVAL = 40;

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
