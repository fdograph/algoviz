import React from 'react';

import Styles from './App.module.scss';
import { Algorithm } from '../components/Algorithm';
import { shuffleArray } from '../logic/utils';

const sampleList = Array.from(
  { length: 75 },
  () => Math.floor(Math.random() * 70) + 1
);

const App: React.FC = () => {
  return (
    <div className={Styles.app}>
      <Algorithm algo="bubble" values={shuffleArray(sampleList)} />
    </div>
  );
};

export default App;
