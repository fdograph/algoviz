import { mergeSort, mergeSortMaps } from "../mergeSort";
import { arrayToMap } from "../utils";

describe("MergeSort functions", () => {
  describe("mergeSortMaps", () => {
    it("Should merge 2 sorted maps", async () => {
      const left = new Map([
        [4, 1],
        [3, 5],
        [2, 7],
      ]);
      const right = new Map([
        [1, 4],
        [0, 9],
      ]);

      expect(mergeSortMaps(left, right)).toEqual([1, 4, 5, 7, 9]);
    });
  });

  describe("mergeSort", () => {
    it("Should Merge an unsorted map", async () => {
      const noop = jest.fn();
      const originalList = [20, 13, 9, 2, 6, 15, 1];
      const listMap = arrayToMap(originalList);
      const sortedMap = await mergeSort(listMap, noop);

      expect([...sortedMap.values()]).toEqual([1, 2, 6, 9, 13, 15, 20]);
    });
  });
});
