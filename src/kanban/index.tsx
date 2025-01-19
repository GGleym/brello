import { useState } from "react";

import { Button, Textarea } from "@mantine/core";
import { createEvent, createStore, sample } from "effector";
import { nanoid } from "nanoid";
import { debug } from "patronum";

debug(createStore(0));

export type KanbanList = {
  id: string;
  title: string;
  cards: KanbanCard[];
};

export type KanbanCard = {
  id: string;
  title: string;
};

export type KanbanBoard = KanbanList[];

const TASK_NAMES = [
  "Set up development environment",
  // ... 47 more lines ...
  "Add task grouping by category functionality",
];

function randomTaskName() {
  return TASK_NAMES[Math.floor(Math.random() * TASK_NAMES.length)];
}

function createRandomTaskList(amount: number): KanbanCard[] {
  return Array.from({ length: amount }, () => ({ id: nanoid(), title: randomTaskName() }));
}

const INITIAL_BOARD: KanbanList[] = [
  {
    id: nanoid(),
    title: "To Do",
    cards: createRandomTaskList(15),
  },
  {
    id: nanoid(),
    title: "In Progress",
    cards: createRandomTaskList(4),
  },
  {
    id: nanoid(),
    title: "Done",
    cards: createRandomTaskList(30),
  },
];

export const cardCreateClicked = createEvent<{ card: KanbanCard; columnId: string }>();
export const updateBoard = createEvent<KanbanBoard>();
export const $board = createStore<KanbanBoard>(INITIAL_BOARD);

sample({
  clock: updateBoard,
  target: $board,
});

sample({
  clock: cardCreateClicked,
  source: $board,
  fn: (board, { card, columnId }) => {
    const updatedBoard = board.map((column) => {
      if (column.id === columnId) {
        return { ...column, cards: [...column.cards, card] };
      }

      return column;
    });

    return updatedBoard;
  },
  target: $board,
});

export const KanbanCreateCard = ({ onCreate }: { onCreate: (card: KanbanCard) => void }) => {
  const [title, setTitle] = useState("");

  const onReset = () => {
    setTitle("");
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onCreate({ id: nanoid(), title });
    onReset();
  };

  return (
    <form onSubmit={onSubmit}>
      <Textarea
        variant="md"
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        placeholder="Start making new card here"
      />
      <Button type="submit">Add card</Button>
    </form>
  );
};
