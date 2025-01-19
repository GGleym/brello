import { useState } from "react";

import { Button, Textarea } from "@mantine/core";
import { useUnit } from "effector-react";

import { cardCreateClicked } from "./model";

export const KanbanCreateCard = ({ columnId }: { columnId: string }) => {
  const [onCreateCard] = useUnit([cardCreateClicked]);
  const [title, setTitle] = useState("");

  const onReset = () => {
    setTitle("");
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onCreateCard({ card: { title }, columnId });
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
