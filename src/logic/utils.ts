import { VisualAlgoControl } from "./algorithms";

export type BaseAlgoFn = (
  list: Map<number, number>,
  onSortStep: (list: Map<number, number>) => Promise<void>
) => Promise<Map<number, number>>;

export type VisualAlgoFn = (
  originalList: number[],
  setRenderList: (l: number[]) => void,
  setSelectedIdxs: (idxs: Set<number>) => void
) => VisualAlgoControl;

export const delay = (t: number) => new Promise((r) => setTimeout(r, t));

export const delayMethod = async (
  method: () => Promise<void> | void,
  t: number
) => {
  await method();
  await delay(t);
};

export const updateAt = (
  source: Readonly<number[]>,
  idx: number,
  val: number
) => {
  const updated = [...source];
  updated.splice(idx, 1, val);

  return updated;
};

export const swap = (base: number, target: number, source: number[]) => {
  const result = [...source];

  [result[base], result[target]] = [result[target], result[base]];

  return result;
};

export const arrayToMap = (list: number[]): Map<number, number> =>
  new Map(list.map((v, idx) => [idx, v]));

export const splitMap = (map: Map<number, number>) => {
  const half = Math.ceil(map.size / 2);
  const entries = [...map.entries()];
  const parts = {
    left: new Map<number, number>(),
    right: new Map<number, number>(),
  };

  entries.forEach(([idx, val], entryIdx) => {
    if (entryIdx < half) {
      parts.left.set(idx, val);
    } else {
      parts.right.set(idx, val);
    }
  });

  return parts;
};

export const updateSortedMap = (map: Map<number, number>, sorted: number[]) => {
  const entries = [...map.entries()];
  const sortedMap = new Map<number, number>();

  entries.forEach(([oIdx, eVal], eIdx) => {
    sortedMap.set(oIdx, sorted[eIdx]);
  });

  return sortedMap;
};

export const buildRandomList = (size: number) => {
  return [...new Array(size)]
    .map((n, idx) => idx + 1)
    .sort(() => (Math.random() > 0.5 ? 1 : -1));
};

export const graduallyInsertEntries = async (
  map: Map<number, number>,
  list: number[],
  setRenderList: (l: number[]) => void,
  setSelectedIdxs: (idxs: Set<number>) => void,
  interval: number
) => {
  let resultList = [...list];

  for (const [idx, val] of map.entries()) {
    if (resultList[idx] === val) {
      continue;
    }

    const updatedList = updateAt(resultList, idx, val);
    setSelectedIdxs(new Set<number>([idx]));
    setRenderList(updatedList);
    resultList = updatedList;

    await delay(interval);
  }

  return resultList;
};

export const insertEntries = (map: Map<number, number>, list: number[]) => {
  let resultList = [...list];

  for (const [idx, val] of map.entries()) {
    resultList = updateAt(resultList, idx, val);
  }

  return resultList;
};

export const listsAreEqual = (l1: number[], l2: number[]): boolean => {
  return l1.join("") === l2.join("");
};

let KILL_SWITCH = false;
export const resetKillSwitch = () => {
  KILL_SWITCH = false;
};

export const enableKillSwitch = () => {
  KILL_SWITCH = true;
};

export const checkKillSwitch = () => {
  if (KILL_SWITCH) {
    throw new Error("Algorithm was paused or killed");
  }
};

export type StepFn = (list: Map<number, number>) => Promise<void>;
export const onSortStep = (
  originalList: number[],
  setRenderList: (l: number[]) => void,
  setSelectedIdxs: (idxs: Set<number>) => void,
  interval: number
): StepFn => {
  return async (list: Map<number, number>) => {
    const newList = insertEntries(list, originalList);

    if (!listsAreEqual(newList, originalList)) {
      originalList = await graduallyInsertEntries(
        list,
        originalList,
        setRenderList,
        setSelectedIdxs,
        interval
      );
    }
  };
};

export const filterMap = (
  map: Map<number, number>,
  comparator: (key: number, val: number) => boolean
): Map<number, number> => {
  const resultMap: Map<number, number> = new Map<number, number>();

  for (const [key, val] of map) {
    if (comparator(key, val)) {
      resultMap.set(key, val);
    }
  }

  return resultMap;
};
