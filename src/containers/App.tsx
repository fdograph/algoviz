import React from 'react';

import Styles from './App.module.scss';
import { Screen } from '../components/Screen';
import { shuffleArray } from '../logic/utils';

const sampleList = Array.from(
  { length: 50 },
  () => Math.floor(Math.random() * 70) + 1
);

const App: React.FC = () => {
  return (
    <div className={Styles.app}>
      <Screen algo="bubble" values={shuffleArray(sampleList)} />
    </div>
  );
};

export default App;
