import { arrayToMap, splitMap, updateAt, updateSortedMap } from "../utils";

describe("utils tests", () => {
  describe("updateAt", () => {
    it("Should update a value in an array in the given index mutating it", () => {
      let arr = [1, 2, 3];

      arr = updateAt(arr, 1, 5);
      expect(arr).toEqual([1, 5, 3]);

      arr = updateAt(arr, 0, 5);
      expect(arr).toEqual([5, 5, 3]);

      arr = updateAt(arr, 2, 5);
      expect(arr).toEqual([5, 5, 5]);
    });
  });

  describe("arrayToMap", () => {
    it("should build an indexed map from a given array", () => {
      const arr = [1, 2, 3];
      const expectedMap = new Map([
        [0, 1],
        [1, 2],
        [2, 3],
      ]);

      expect(arrayToMap(arr)).toEqual(expectedMap);
    });
  });

  describe("splitMap", () => {
    it("should split a map in two halfs", () => {
      const sourceMap = new Map([
        [2, 1],
        [3, 2],
        [4, 3],
        [5, 1],
        [6, 2],
      ]);
      const expectedLeft = new Map([
        [2, 1],
        [3, 2],
        [4, 3],
      ]);
      const expectedRight = new Map([
        [5, 1],
        [6, 2],
      ]);
      const result = splitMap(sourceMap);

      expect(result.left).toEqual(expectedLeft);
      expect(result.right).toEqual(expectedRight);
    });
  });

  describe("updateSortedMap", () => {
    it("Should update a map with sorted values while preserving the indexes", () => {
      const sourceMap = new Map([
        [2, 6],
        [3, 4],
        [4, 2],
        [5, 5],
        [6, 1],
      ]);
      const sortedValues = [1, 2, 4, 5, 6];
      const expectedResult = new Map([
        [2, 1],
        [3, 2],
        [4, 4],
        [5, 5],
        [6, 6],
      ]);

      expect(updateSortedMap(sourceMap, sortedValues)).toEqual(expectedResult);
    });
  });
});
