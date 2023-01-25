import styles from "./HabitDay.module.css";
import * as Popover from "@radix-ui/react-popover";
import ProgressBar from "../ProgressBar/ProgressBar";
import dayjs from "dayjs";
import HabitList from "../HabitDayPopover/HabitList";
import { useState } from "react";

interface HabitDayProps {
  defaultCompleted?: number;
  amount?: number;
  date: Date;
}

const HabitDay = ({
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) => {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayInMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  const handleCompletedChanged = (completed: number) => {
    setCompleted(completed);
  };

  return (
    <Popover.Root>
      <Popover.Trigger
        className={styles.dayTableItem}
        style={
          completedPercentage >= 80
            ? { backgroundColor: "#8B5CF6", border: "2px solid #A78BFA" }
            : completedPercentage >= 60 && completedPercentage < 80
            ? { backgroundColor: "#7C3AED", border: "2px solid #8B5CF6" }
            : completedPercentage >= 40 && completedPercentage < 60
            ? { backgroundColor: "#6D28D9", border: "2px solid #8B5CF6" }
            : completedPercentage >= 20 && completedPercentage < 40
            ? { backgroundColor: "#5B21B6", border: "2px solid #7C3AED" }
            : completedPercentage > 0 && completedPercentage < 20
            ? { backgroundColor: "#4C1D95", border: "2px solid #6D28D9" }
            : undefined
        }
      ></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.content}>
          <span className={styles.weekDaySpan}>{dayOfWeek}</span>
          <span className={styles.dateSpan}>{dayInMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <HabitList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow fill="#18181B" height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default HabitDay;
