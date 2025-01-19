import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { Container, Grid, Group, Stack, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { KanbanCreateCard } from "kanban";
import { $board, cardMoved } from "kanban/model";

import { BoardColumn } from "./ui";

export const Board = () => {
  const [board, onCardMove] = useUnit([$board, cardMoved]);

  const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    const fromColumnId = source.droppableId;
    const toColumnId = destination.droppableId;
    const fromIndex = source.index;
    const toIndex = destination.index;

    onCardMove({ fromColumnId, toColumnId, fromIndex, toIndex });
  };

  return (
    <Container size="md" py="md">
      <Stack>
        <Group w="100%">
          <Text>Board</Text>
        </Group>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid grow gutter="md">
            {board.map(({ id, title, cards }) => (
              <Grid.Col key={id} id={id} span={4}>
                <BoardColumn id={id} title={title} cards={cards}>
                  <KanbanCreateCard columnId={id} />
                </BoardColumn>
              </Grid.Col>
            ))}
          </Grid>
        </DragDropContext>
      </Stack>
    </Container>
  );
};
