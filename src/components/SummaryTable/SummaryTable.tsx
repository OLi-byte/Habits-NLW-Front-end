import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";
import HabitDay from "../HabitDay/HabitDay";
import styles from "./SummaryTable.module.css";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimunSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length;

type summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

const SummaryTable = () => {
  const [summary, setSumary] = useState<summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSumary(response.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.weekDays}>
        {weekDays.map((weekDay, index) => {
          return (
            <div className={styles.day} key={index}>
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className={styles.dayTable}>
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });
            return (
              <HabitDay
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
                date={date}
                key={date.toString()}
              />
            );
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return <div key={index} className={styles.dayTableItemOf} />;
          })}
      </div>
    </div>
  );
};

export default SummaryTable;
