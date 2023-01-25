import React, { useState } from "react";
import logoImage from "../../assets/logo.svg";
import { Plus, X } from "phosphor-react";
import styles from "./Header.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import NewHabitForm from "../NewHabitForm/NewHabitForm";

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logoImage} alt="logo" />
      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className={styles.create_new_habit_button}
        >
          <Plus size={20} color="#8B5CF6" />
          Novo hábito
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.content}>
            <Dialog.Close className={styles.closeButton}>
              <X size={24} arial-label="Fechar" />
            </Dialog.Close>
            <Dialog.Title>Crair Hábito</Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Header;
