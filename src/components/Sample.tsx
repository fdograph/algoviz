import React from 'react';
import classnames from 'classnames';
import Styles from './Sample.module.scss';
type ColorType = 'primary' | 'secondary' | 'complementary';

interface SampleProps {
  active?: boolean;
  color: ColorType;
  value: number;
  max: number;
}

export const Sample: React.FC<SampleProps> = ({
  active,
  color,
  value,
  max,
}) => {
  return (
    <div
      className={classnames(getColorStyle(color), {
        [Styles.activeSample]: active,
      })}
      style={{
        height: `${(100 * value) / max}%`,
      }}
    >
      <span className={Styles.sampleText}>{value}</span>
    </div>
  );
};

const getColorStyle = (c: ColorType) => {
  switch (c) {
    case 'secondary':
      return Styles.secondary;
    case 'complementary':
      return Styles.complementary;
    case 'primary':
    default:
      return Styles.primary;
  }
};
