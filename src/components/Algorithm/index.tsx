import React from "react";

import Styles from "./Algorithm.module.css";
import { Item } from "./Item";

interface SceneProps {
  renderList: number[];
  selected: Set<number>;
  max: number;
  min: number;
}

export const Algorithm: React.FC<SceneProps> = ({
  renderList,
  max,
  min,
  selected,
}) => {
  const items = renderList.map((val, idx) => (
    <Item
      key={idx}
      value={val}
      isSelected={selected.has(idx)}
      max={max}
      min={min}
    />
  ));

  return <div className={Styles.algorithm}>{items}</div>;
};
