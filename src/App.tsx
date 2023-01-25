import React from "react";
import "./lib/dayjs";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import SummaryTable from "./components/SummaryTable/SummaryTable";

function App() {
  return (
    <div className={styles.page_content}>
      <div className={styles.container}>
        <Header />
        <SummaryTable />
      </div>
    </div>
  );
}

export default App;
