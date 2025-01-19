import { createEvent, createStore, sample } from "effector";
import { nanoid } from "nanoid";

export type KanbanList = {
  id: string;
  title: string;
  cards: KanbanCard[];
};

export type KanbanCard = {
  id: string;
  title: string;
};

export type KanbanCardForm = Pick<KanbanCard, "title">;

export type KanbanBoard = KanbanList[];

const TASK_NAMES = [
  "Set up development environment",
  "Create component structure",
  "Implement basic routing",
  "Design task board layout",
  "Add drag-and-drop functionality for cards",
  "Develop notification system",
  "Integrate user authentication",
  "Connect Google API for OAuth",
  "Implement task filtering by status",
  "Add tagging functionality",
  "Develop task prioritization system",
  "Integrate third-party analytics API",
  "Set up automatic data saving",
  "Create user roles system",
  "Add comments to tasks",
  "Integrate external file storage",
  "Enable public boards functionality",
  "Develop mobile interface version",
  "Add push notifications",
  "Optimize application performance",
  "Implement board archiving functionality",
  "Develop import/export data feature",
  "Create dark mode for interface",
  "Add card copying functionality",
  "Integrate Jira data migration",
  "Create task charts and graphs",
  "Implement search functionality for tasks",
  "Develop quick task evaluation widget",
  "Add deadlines feature for cards",
  "Set up automatic data backups",
  "Add multi-language support",
  "Create board customization system",
  "Integrate with Slack for task updates",
  "Add task change history tracking",
  "Create “My Tasks” page for users",
  "Develop API for external system integration",
  "Create statistics for completed tasks",
  "Implement bulk card movement system",
  "Add task subscription functionality",
  "Connect Google Analytics for tracking",
  "Develop user documentation",
  "Integrate calendar sync for deadlines",
  "Add task recovery from trash functionality",
  "Develop “Reports and Analysis” section",
  "Create admin panel for user management",
  "Implement multi-level subtask system",
  "Integrate GitHub sync for task tracking",
  "Optimize database for large datasets",
  "Create metrics system to track productivity",
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

export const cardCreateClicked = createEvent<{ card: KanbanCardForm; columnId: string }>();
export const cardEditClicked = createEvent<{ columnId: string; cardId: string; card: KanbanCardForm }>();
export const cardDeleteClicked = createEvent<{ columnId: string; cardId: string }>();
export const cardMoved = createEvent<{
  fromColumnId: string;
  toColumnId: string;
  fromIndex: number;
  toIndex: number;
}>();
const cardMovedInTheColumn = cardMoved.filter({
  fn: ({ fromColumnId, toColumnId }) => fromColumnId === toColumnId,
});
const cardMovedToAnotherColumn = cardMoved.filter({
  fn: ({ fromColumnId, toColumnId }) => fromColumnId !== toColumnId,
});

export const $board = createStore<KanbanBoard>(INITIAL_BOARD);

sample({
  clock: cardCreateClicked,
  source: $board,
  fn: (board, { card, columnId }) => {
    const updatedBoard = board.map((column) => {
      if (column.id === columnId) {
        const newCard = { ...card, id: nanoid() };

        return { ...column, cards: [...column.cards, newCard] };
      }

      return column;
    });

    return updatedBoard;
  },
  target: $board,
});

sample({
  clock: cardEditClicked,
  source: $board,
  fn: (board, { columnId, card, cardId }) => {
    const updatedBoard = board.map((column) => {
      if (column.id === columnId) {
        const updatedCards = column.cards.map((existingCard) => {
          if (existingCard.id === cardId) {
            return { ...existingCard, ...card };
          }

          return existingCard;
        });

        return { ...column, cards: updatedCards };
      }

      return column;
    });

    return updatedBoard;
  },
  target: $board,
});

sample({
  clock: cardDeleteClicked,
  source: $board,
  fn: (board, { columnId, cardId }) => {
    const updatedBoard = board.map((column) => {
      if (column.id === columnId) {
        const updatedCards = column.cards.filter((card) => card.id !== cardId);

        return { ...column, cards: updatedCards };
      }

      return column;
    });

    return updatedBoard;
  },
  target: $board,
});

sample({
  clock: cardMovedInTheColumn,
  source: $board,
  fn: (board, { fromColumnId, fromIndex, toIndex }) => {
    const updatedBoard = board.map((column) => {
      if (column.id === fromColumnId) {
        const updatedList = listReorder(column, fromIndex, toIndex);

        return updatedList;
      }

      return column;
    });

    return updatedBoard;
  },
  target: $board,
});

sample({
  clock: cardMovedToAnotherColumn,
  source: $board,
  fn: (board, { fromColumnId, toColumnId, fromIndex, toIndex }) =>
    cardMove(board, fromColumnId, toColumnId, fromIndex, toIndex),
  target: $board,
});

function cardMove(
  board: KanbanBoard,
  sourceColumnId: string,
  destinationColumnId: string,
  fromIndex: number,
  toIndex: number,
): KanbanBoard {
  const sourceColumnIndex = board.findIndex((column) => column.id === sourceColumnId);
  const destinationColumnIndex = board.findIndex((column) => column.id === destinationColumnId);

  const sourceColumn = board[sourceColumnIndex];
  const destinationColumn = board[destinationColumnIndex];

  const card = sourceColumn.cards[fromIndex];

  const updatedSourceColumn = { ...sourceColumn, cards: sourceColumn.cards.filter((_, index) => index !== fromIndex) };
  const updatedDestinationColumn = {
    ...destinationColumn,
    cards: [...destinationColumn.cards.slice(0, toIndex), { ...card }, ...destinationColumn.cards.slice(toIndex)],
  };

  return board.map((column) => {
    if (column.id === sourceColumnId) {
      return updatedSourceColumn;
    }

    if (column.id === destinationColumnId) {
      return updatedDestinationColumn;
    }

    return column;
  });
}

function listReorder(list: KanbanList, startIndex: number, endIndex: number): KanbanList {
  const cards = Array.from(list.cards);
  const [removed] = cards.splice(startIndex, 1);
  cards.splice(endIndex, 0, removed);

  return { ...list, cards };
}
