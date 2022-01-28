import React from "react";
import classNames from "classnames";
import SortingAlgos from "../components/SortingAlgos";

import Styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <main id="app" className={classNames(Styles.appWrapper)}>
      <SortingAlgos />
    </main>
  );
};

export default App;
