import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import styles from "./NewHabitForm.module.css";

const NewHabitForm = () => {
  const availableWeekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const [isChecked, setIsChecked] = useState(
    new Array(availableWeekDays.length).fill(false)
  );
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  const handleOnChange = (position: number) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  const HandleWeekDaysChecked = (weekDay: number) => {
    if (weekDays.includes(weekDay)) {
      const removedWeekDays = weekDays.filter((day) => day !== weekDay);

      setWeekDays(removedWeekDays);
    } else {
      const addedWeekDays = [...weekDays, weekDay];

      setWeekDays(addedWeekDays);
    }
  };

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("/habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);
    setIsChecked([false]);

    alert("Hábito criado com sucesso!");
  };

  return (
    <form onSubmit={createNewHabit} className={styles.form}>
      <label htmlFor="title">Qual o seu compromentimento?</label>

      <input
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ex.: Exercícios, dormir bem, etc..."
        autoFocus
      />
      <label htmlFor="" className={styles.checkBoxLabel}>
        Qual a reconhencia?
      </label>

      <div className={styles.checkBoxWrapper}>
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className={styles.checkBox}
              onCheckedChange={() => {
                handleOnChange(index);
                HandleWeekDaysChecked(index);
              }}
              checked={isChecked[index]}
            >
              <div
                className={styles.checkBoxSquare}
                style={
                  isChecked[index]
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
                  isChecked[index]
                    ? { textDecoration: "line-through", color: "#A1A1AA" }
                    : undefined
                }
              >
                {weekDay}
              </span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button type="submit" className={styles.submitButton}>
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
};

export default NewHabitForm;
