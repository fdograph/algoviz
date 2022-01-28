import React, { useCallback, useEffect, useMemo, useState } from "react";
import { buildRandomList } from "../../logic/utils";

import Styles from "./SortingAlgos.module.css";
import { AlgoType, getAlgo } from "../../logic/algorithms";
import { Algorithm } from "../Algorithm";
import { AlgoTypeSelector } from "./AlgoTypeSelector";
import classNames from "classnames";

const SortingAlgos: React.FC = () => {
  const [algoType, setAlgoType] = useState<AlgoType>(AlgoType.BUBBLE_SORT);
  const [initialList] = useState(buildRandomList(150));
  const [min, max] = [Math.min(...initialList), Math.max(...initialList)];
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
      algo.play(30).then((sorted) => {
        algo.pause();
        setIsPlaying(false);
        setRenderList(sorted);
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

  return (
    <section className={Styles.AlgorithmsWrapper}>
      <div className={Styles.AlgorithmsControls}>
        <div className={Styles.AlgorithmsControlField}>
          <AlgoTypeSelector
            selectedType={algoType}
            onChange={(t) => setAlgoType(t)}
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
          max={max}
          min={min}
        />
      </section>
    </section>
  );
};

export default SortingAlgos;
