import { useEffect, useState } from "react";
import styles from "./HabitList.module.css";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../../lib/axios";
import dayjs from "dayjs";

interface HabitListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  complitedHabits: string[];
}

const HabitList = ({ date, onCompletedChanged }: HabitListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  const handleToggleHabit = async (habitId: string) => {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitChecked = habitsInfo!.complitedHabits.includes(habitId);

    let complitedHabits: string[] = [];

    if (isHabitChecked) {
      complitedHabits = habitsInfo!.complitedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      complitedHabits = [...habitsInfo!.complitedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      complitedHabits,
    });

    onCompletedChanged(complitedHabits.length);
  };

  return (
    <div>
      <div className={styles.checkBoxWrapper}>
        {habitsInfo?.possibleHabits.map((habit) => {
          return (
            <Checkbox.Root
              key={habit.id}
              className={styles.checkBox}
              disabled={isDateInPast}
              onCheckedChange={() => handleToggleHabit(habit.id)}
              checked={habitsInfo.complitedHabits.includes(habit.id)}
            >
              <div
                className={styles.checkBoxSquare}
                style={
                  habitsInfo.complitedHabits.includes(habit.id)
                    ? {
                        backgroundColor: "#22C55E",
                        border: "2px solid #22C55E",
                      }
                    : undefined
                }
              >
                <Checkbox.Indicator>
                  <Check size={20} color="white" />
                </Checkbox.Indicator>
              </div>
              <span
                style={
                  habitsInfo.complitedHabits.includes(habit.id)
                    ? { textDecoration: "line-through", color: "#A1A1AA" }
                    : undefined
                }
              >
                {habit.title}
              </span>
            </Checkbox.Root>
          );
        })}
      </div>
    </div>
  );
};

export default HabitList;
