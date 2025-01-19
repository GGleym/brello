import { useState } from "react";

import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Group, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import { useUnit } from "effector-react";
import { cardDeleteClicked, cardEditClicked } from "kanban/model";

type TCardProps = {
  /** Идентификатор карточки */
  id: string;
  /** Идентификатор колонки */
  columnId: string;
  /** Текст карточки */
  title: string;
  /** index карточки */
  index: number;
};

export const Card = ({ id, columnId, title, index }: TCardProps) => {
  const [onCardEdit, onCardDelete] = useUnit([cardEditClicked, cardDeleteClicked]);
  const [editTitle, setEditTitle] = useState(title);
  const [editMode, setEditMode] = useState(false);

  const resetEditForm = () => {
    setEditTitle(title);
    setEditMode(false);
  };

  const onEditFinished = () => {
    onCardEdit({ columnId, cardId: id, card: { title: editTitle } });
    resetEditForm();
  };

  const onDelete = () => {
    onCardDelete({ columnId, cardId: id });
  };

  if (editMode) {
    return (
      <div>
        <Textarea variant="md" value={editTitle} onChange={({ target: { value } }) => setEditTitle(value)} />
        <Group>
          <ActionIcon onClick={onEditFinished}>
            <IconCheck size={14} />
          </ActionIcon>
          <ActionIcon onClick={resetEditForm}>
            <IconX size={14} />
          </ActionIcon>
        </Group>
      </div>
    );
  }

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {({ innerRef, dragHandleProps, draggableProps }) => (
        <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
          <p>{title}</p>
          <Group>
            <ActionIcon onClick={() => setEditMode(true)}>
              <IconPencil size={14} />
            </ActionIcon>
            <ActionIcon onClick={onDelete}>
              <IconTrash size={14} />
            </ActionIcon>
          </Group>
        </div>
      )}
    </Draggable>
  );
};
