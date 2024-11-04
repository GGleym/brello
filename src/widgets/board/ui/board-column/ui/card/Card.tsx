import { Draggable } from "@hello-pangea/dnd";
import { Paper, Text } from "@mantine/core";

type TCardProps = {
  /** Идентификатор карточки */
  id: string;
  /** Текст карточки */
  text: string;
  /** index карточки */
  index: number;
};

export const Card = ({ id, text, index }: TCardProps) => (
  <Draggable key={id} draggableId={id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        // className={cn(styles.item, snapshot.isDragging ? styles.dragging : null)}
      >
        <Paper p="md" shadow="xs">
          <Text>{text}</Text>
        </Paper>
      </div>
    )}
  </Draggable>
);
