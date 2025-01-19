import { DragDropContext } from "@hello-pangea/dnd";
import { Container, Grid, Group, Stack, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { $board, KanbanCreateCard, cardCreateClicked, updateBoard } from "kanban";

import { BoardColumn } from "./ui";

export const Board = () => {
  const [board] = useUnit([$board, updateBoard]);
  const [onCreateCard] = useUnit([cardCreateClicked]);

  return (
    <Container size="md" py="md">
      <Stack>
        <Group w="100%">
          <Text>Board</Text>
        </Group>
        <DragDropContext onDragEnd={() => {}}>
          <Grid grow gutter="md">
            {board.map(({ id, title, cards }) => (
              <Grid.Col key={id} id={id} span={4}>
                <BoardColumn id={id} title={title} cards={cards} />
                <KanbanCreateCard onCreate={(card) => onCreateCard({ card, columnId: id })} />
              </Grid.Col>
            ))}
          </Grid>
        </DragDropContext>
      </Stack>
    </Container>
  );
};
