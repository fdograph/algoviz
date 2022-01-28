import {
  arrayToMap,
  checkKillSwitch,
  enableKillSwitch,
  onSortStep,
  resetKillSwitch,
  splitMap,
  updateSortedMap,
  VisualAlgoFn,
} from "./utils";
import type { BaseAlgoFn } from "./utils";

export const mergeSortMaps = (
  left: Map<number, number>,
  right: Map<number, number>
): number[] => {
  const result: number[] = [];
  const leftValues = [...left.values()];
  const rightValues = [...right.values()];
  let lidx = 0;
  let ridx = 0;

  while (lidx < leftValues.length && ridx < rightValues.length) {
    const levalue = leftValues[lidx];
    const revalue = rightValues[ridx];

    if (levalue < revalue) {
      result.push(levalue);
      lidx++;
    } else {
      result.push(revalue);
      ridx++;
    }
  }

  while (lidx < leftValues.length) {
    const levalue = leftValues[lidx];
    result.push(levalue);
    lidx++;
  }

  while (ridx < rightValues.length) {
    const revalue = rightValues[ridx];
    result.push(revalue);
    ridx++;
  }

  return result;
};

export const mergeSort: BaseAlgoFn = async (
  list: Map<number, number>,
  onSortStep: (list: Map<number, number>) => Promise<void>
): Promise<Map<number, number>> => {
  checkKillSwitch();

  await onSortStep(list);

  if (list.size <= 1) {
    return list;
  }

  const parts = splitMap(list);
  const left = await mergeSort(parts.left, onSortStep);
  await onSortStep(left);

  const right = await mergeSort(parts.right, onSortStep);
  await onSortStep(right);

  const sortedParts = mergeSortMaps(left, right);
  const sortedMap = updateSortedMap(list, sortedParts);
  await onSortStep(sortedMap);

  return sortedMap;
};

export const mergeSortAlgoFn: VisualAlgoFn = (
  originalList: number[],
  setRenderList: (l: number[]) => void,
  setSelectedIdxs: (idxs: Set<number>) => void
) => ({
  play: async (interval: number) => {
    resetKillSwitch();

    const sortedMap = await mergeSort(
      arrayToMap(originalList),
      onSortStep(originalList, setRenderList, setSelectedIdxs, interval)
    );

    setSelectedIdxs(new Set<number>());

    return [...sortedMap.values()];
  },
  pause: () => enableKillSwitch(),
});
