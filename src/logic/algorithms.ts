import { mergeSortAlgoFn } from "./mergeSort";
import { bubbleSortAlgoFn } from "./bubbleSort";
import { quickSortAlgoFn } from "./quickSort";
import { VisualAlgorithm } from "./utils";

export enum AlgoType {
  BUBBLE_SORT = "@AlgoType/BUBBLE_SORT",
  MERGE_SORT = "@AlgoType/MERGE_SORT",
  QUICK_SORT = "@AlgoType/QUICK_SORT",
}

export const getAlgo = (
  type: AlgoType,
  originalList: number[],
  setRenderList: (l: number[]) => void,
  setSelectedIdxs: (idxs: Set<number>) => void
): VisualAlgorithm => {
  switch (type) {
    case AlgoType.MERGE_SORT:
      return mergeSortAlgoFn(originalList, setRenderList, setSelectedIdxs);
    case AlgoType.BUBBLE_SORT:
      return bubbleSortAlgoFn(originalList, setRenderList, setSelectedIdxs);
    case AlgoType.QUICK_SORT:
      return quickSortAlgoFn(originalList, setRenderList, setSelectedIdxs);
    default:
      throw new Error("Invalid algo type:" + type);
  }
};
