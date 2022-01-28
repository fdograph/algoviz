import React from "react";
import classNames from "classnames";

import Styles from "./Algorithm.module.css";

interface ItemProps {
  value: number;
  max: number;
  min: number;
  isSelected: boolean;
}

export const Item: React.FC<ItemProps> = ({ value, max, min, isSelected }) => {
  const heightPercent = (value * 100) / max;
  return (
    <div
      className={classNames(Styles.item, { [Styles.itemSelected]: isSelected })}
      style={{ height: `${heightPercent}%` }}
    />
  );
};
