import { arrayToMap } from "../utils";
import { quickSort } from "../quickSort";

describe("quickSort", () => {
  it("Should Sort an array", async () => {
    const noop = jest.fn();
    const originalList = [20, 13, 9, 2, 6, 15, 1];
    const listMap = arrayToMap(originalList);
    const sortedMap = await quickSort(
      listMap,
      0,
      originalList.length - 1,
      noop
    );

    expect([...sortedMap.values()]).toEqual([1, 2, 6, 9, 13, 15, 20]);
  });
});
