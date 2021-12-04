import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Sample } from './Sample';

import Styles from './Algorithm.module.scss';
import { mergeSort, visualBubbleSort, visualMergeSort } from '../logic/algos';

interface ScreenProps {
  values: number[];
  algo: string;
}

export const Algorithm: React.FC<ScreenProps> = ({ values, algo }) => {
  const [list, setList] = useState<number[]>(values);
  const [currentSet, setCurrentSet] = useState<Set<number>>(new Set());
  const max = Math.max(...values);
  const algorithmTrigger = useCallback(
    // () => visualBubbleSort(values, setList, setCurrentSet),
    () => visualMergeSort(values, setList, setCurrentSet),
    [values]
  );

  const sampleList = useMemo(
    () =>
      list.map((val, i) => (
        <Sample
          key={`${algo}:${i}:${val}`}
          color="primary"
          value={val}
          max={max}
          active={currentSet.has(i)}
        />
      )),
    [currentSet, algo, list, max]
  );

  useEffect(() => {
    algorithmTrigger().then(() => console.log('Finished Sorting 🌈'));
  }, [algorithmTrigger]);

  return (
    <div className={Styles.algorithm}>
      <div className={Styles.sampleHolder}>{sampleList}</div>
    </div>
  );
};
