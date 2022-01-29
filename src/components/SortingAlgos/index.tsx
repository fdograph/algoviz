import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { buildRandomList } from "../../logic/utils";

import Styles from "./SortingAlgos.module.css";
import { AlgoType, getAlgo } from "../../logic/algorithms";
import { Algorithm } from "../Algorithm";
import { AlgoTypeSelector } from "./AlgoTypeSelector";
import classNames from "classnames";

const resetOnResize = (
  setList: (l: number[]) => void,
  setRenderList: (l: number[]) => void
) => () => {
  const list = buildRandomList(Math.ceil(window.innerWidth / 10));
  setList(list);
  setRenderList(list);
};

const SortingAlgos: React.FC = () => {
  const [algoType, setAlgoType] = useState<AlgoType>(AlgoType.BUBBLE_SORT);
  const [initialList, setInitialList] = useState(
    buildRandomList(Math.ceil(window.innerWidth / 10))
  );
  const [renderList, setRenderList] = useState<number[]>(initialList);
  const [selectedIdxs, setSelectedIdxs] = useState<Set<number>>(new Set());
  const [isPLaying, setIsPlaying] = useState<boolean>(false);
  const algo = useMemo(
    () => getAlgo(algoType, initialList, setRenderList, setSelectedIdxs),
    [algoType, initialList]
  );

  const playPause = useCallback(() => {
    if (isPLaying) {
      algo.pause();
      setIsPlaying(false);
    } else {
      algo
        .play(30)
        .then((sorted) => {
          algo.pause();
          setIsPlaying(false);
          setRenderList(sorted);
        })
        .catch(() => {
          console.log("CANCELLED");
        });
      setIsPlaying(true);
    }
  }, [algo, isPLaying]);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
      algo.pause();
    };
  }, [algo]);

  useLayoutEffect(() => {
    const onResize = resetOnResize(setInitialList, setRenderList);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className={Styles.AlgorithmsWrapper}>
      <div className={Styles.AlgorithmsControls}>
        <div className={Styles.AlgorithmsControlField}>
          <AlgoTypeSelector
            selectedType={algoType}
            onChange={(t) => {
              const newList = buildRandomList(
                Math.ceil(window.innerWidth / 10)
              );
              algo.pause();
              setInitialList(newList);
              setRenderList(newList);
              setAlgoType(t);
            }}
          />
        </div>
        <div className={Styles.AlgorithmsControlField}>
          <button
            className={classNames(Styles.AlgorithmsControlBtn, {
              [Styles.isPlaying]: isPLaying,
            })}
            onClick={playPause}
          >
            {isPLaying ? "Stop" : "Start"}
          </button>
        </div>
      </div>
      <section>
        <Algorithm
          renderList={renderList}
          selected={selectedIdxs}
          max={Math.max(...initialList)}
          min={Math.min(...initialList)}
        />
      </section>
    </section>
  );
};

export default SortingAlgos;
