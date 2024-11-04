import { nanoid } from "nanoid";

import { TBoardListItem } from "./types";

export const INITIAL_BOARD: TBoardListItem[] = [
  {
    id: nanoid(),
    title: "To Do",
    cards: [
      { id: nanoid(), title: "Setup the Workplace" },
      { id: nanoid(), title: "Review opened issues" },
    ],
  },
  {
    id: nanoid(),
    title: "In Progress",
    cards: [{ id: nanoid(), title: "Implement Kanban feature" }],
  },
  {
    id: nanoid(),
    title: "Done",
    cards: [{ id: nanoid(), title: "Initialized project" }],
  },
];
