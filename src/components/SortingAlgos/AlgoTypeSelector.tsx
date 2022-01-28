import React from "react";
import { AlgoType } from "../../logic/algorithms";

import Style from "./SortingAlgos.module.css";

const getAlgoName = (type: AlgoType) => {
  switch (type) {
    case AlgoType.BUBBLE_SORT:
      return "Bubble Sort";
    case AlgoType.MERGE_SORT:
      return "Merge Sort";
    default:
      return "Unknown";
  }
};

export type AlgoTypeSelectorProps = {
  onChange: (t: AlgoType) => void;
  selectedType: AlgoType;
  attributes?: React.SelectHTMLAttributes<HTMLSelectElement>;
};
export const AlgoTypeSelector: React.FC<AlgoTypeSelectorProps> = ({
  onChange,
  selectedType,
  attributes,
}) => {
  return (
    <div className={Style.AlgorithmsControlSelect}>
      <select
        {...attributes}
        defaultValue={selectedType}
        onChange={(event) => onChange(event.target.value as AlgoType)}
      >
        {Object.values(AlgoType).map((type: AlgoType, i) => (
          <option key={i} value={type}>
            {getAlgoName(type)}
          </option>
        ))}
      </select>
    </div>
  );
};
