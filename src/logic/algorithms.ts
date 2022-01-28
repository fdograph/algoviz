import { mergeSortAlgoFn } from "./mergeSort";
import { bubbleSortAlgoFn } from "./bubbleSort";

export type VisualAlgoControl = {
  play: (interval: number) => Promise<number[]>;
  pause: () => void;
};

export enum AlgoType {
  BUBBLE_SORT = "@AlgoType/BUBBLE_SORT",
  MERGE_SORT = "@AlgoType/MERGE_SORT",
}

export const getAlgo = (
  type: AlgoType,
  originalList: number[],
  setRenderList: (l: number[]) => void,
  setSelectedIdxs: (idxs: Set<number>) => void
): VisualAlgoControl => {
  switch (type) {
    case AlgoType.MERGE_SORT:
      return mergeSortAlgoFn(originalList, setRenderList, setSelectedIdxs);
    case AlgoType.BUBBLE_SORT:
      return bubbleSortAlgoFn(originalList, setRenderList, setSelectedIdxs);
    default:
      throw new Error("Invalid algo type:" + type);
  }
};
