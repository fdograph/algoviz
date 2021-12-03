import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Sample } from './Sample';

import Styles from './Screen.module.scss';
import { visualBubbleSort } from '../logic/algos';

interface ScreenProps {
  values: number[];
  algo: string;
}

export const Screen: React.FC<ScreenProps> = ({ values, algo }) => {
  const [didInit, setInit] = useState<boolean>(false);
  const [list, setList] = useState<number[]>(values);
  const [activeIndexes, setActiveIndexes] = useState<Set<number>>(new Set());
  const max = useMemo(() => Math.max(...list), [list]);

  const sampleList = useMemo(
    () =>
      list.map((val, i) => (
        <Sample
          key={`${algo}:${i}:${val}`}
          color="primary"
          value={val}
          max={max}
          active={activeIndexes.has(i)}
        />
      )),
    [activeIndexes, algo, list, max]
  );

  useEffect(() => {
    if (!didInit) {
      setInit(true);
      visualBubbleSort(list, setList, setActiveIndexes);
    }
  }, [didInit, list]);

  return (
    <div className={Styles.screen}>
      <div className={Styles.sampleHolder}>{sampleList}</div>
    </div>
  );
};
