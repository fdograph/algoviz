import {
  arrayToMap,
  checkKillSwitch,
  enableKillSwitch,
  onSortStep,
  resetKillSwitch,
  swap,
  updateSortedMap,
  VisualAlgoFn,
  VisualAlgorithm,
} from "./utils";

export const partition = (
  list: Map<number, number>,
  beginIdx: number,
  endIdx: number
) => {
  let resultList = [...list.values()];
  const pivot = resultList[endIdx];
  let i = beginIdx - 1;

  for (let j = beginIdx; j < endIdx; j++) {
    if (resultList[j] <= pivot) {
      i++;
      resultList = swap(i, j, resultList);
    }
  }

  i += 1;
  resultList = swap(i, endIdx, resultList);

  return { idx: i, resultList };
};

export const quickSort = async (
  list: Map<number, number>,
  beginIdx: number,
  endIdx: number,
  onSortStep: (list: Map<number, number>) => Promise<void>
): Promise<Map<number, number>> => {
  checkKillSwitch();

  await onSortStep(list);

  if (beginIdx > endIdx) {
    return list;
  }

  const { idx, resultList } = partition(list, beginIdx, endIdx);
  const sortedMap = updateSortedMap(list, resultList);

  await onSortStep(list);

  const sortedA = await quickSort(sortedMap, beginIdx, idx - 1, onSortStep);
  return await quickSort(sortedA, idx + 1, endIdx, onSortStep);
};

export const quickSortAlgoFn: VisualAlgoFn = (
  originalList: number[],
  setRenderList: (l: number[]) => void,
  setSelectedIdxs: (idxs: Set<number>) => void
) =>
  new VisualAlgorithm(async (interval: number) => {
    resetKillSwitch();

    const sortedMap = await quickSort(
      arrayToMap(originalList),
      0,
      originalList.length - 1,
      onSortStep(originalList, setRenderList, setSelectedIdxs, interval)
    );

    setSelectedIdxs(new Set<number>());

    return [...sortedMap.values()];
  });
