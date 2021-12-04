export const shuffleArray = (array: any[]) => {
  return array.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

export const delay = (t: number) => new Promise((r) => setTimeout(r, t));

export const swap = (base: number, target: number, source: number[]) => {
  [source[base], source[target]] = [source[target], source[base]];
};

export const mergeSortedArray = (
  left: number[],
  right: number[],
  leftIndex: number,
  rightIndex: number
) => {
  const result: number[] = [];
  let li = 0;
  let ri = 0;

  while (li < left.length && ri < right.length) {
    if (left[li] < right[ri]) {
      result.push(left[li]);
      li++;
    } else {
      result.push(right[ri]);
      ri++;
    }
  }

  while (li < left.length) {
    result.push(left[li]);
    li++;
  }

  while (ri < right.length) {
    result.push(right[ri]);
    ri++;
  }

  return result;
};

export const swapPart = (
  list: number[],
  startIndex: number,
  values: number[]
): number[] => {
  const result = [...list];

  values.forEach((v, i) => {
    result[startIndex + i] = v;
  });

  return result;
};

export const buildRange = (from: number, to: number): number[] => {
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
};
