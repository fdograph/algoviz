import {
  arrayToMap,
  BaseAlgoFn,
  checkKillSwitch,
  enableKillSwitch,
  onSortStep,
  resetKillSwitch,
  swap,
  VisualAlgoFn,
  VisualAlgorithm,
} from "./utils";

export const bubbleSort: BaseAlgoFn = async (
  map: Map<number, number>,
  onSortStep: (list: Map<number, number>) => Promise<void>
) => {
  let list = [...map.values()];
  const size = list.length;

  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      checkKillSwitch();

      if (list[j] > list[j + 1]) {
        list = swap(j, j + 1, list);

        const targetMap = new Map<number, number>();
        targetMap.set(j, list[j]);
        targetMap.set(j + 1, list[j + 1]);

        await onSortStep(targetMap);
      }
    }
  }

  return arrayToMap(list);
};

export const bubbleSortAlgoFn: VisualAlgoFn = (
  originalList: number[],
  setRenderList: (l: number[]) => void,
  setSelectedIdxs: (idxs: Set<number>) => void
) =>
  new VisualAlgorithm(async (interval: number) => {
    resetKillSwitch();

    const sortedMap = await bubbleSort(
      arrayToMap(originalList),
      onSortStep(originalList, setRenderList, setSelectedIdxs, interval)
    );

    setSelectedIdxs(new Set<number>());

    return [...sortedMap.values()];
  });
