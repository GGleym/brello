import { useState } from "react";

import { DragDropContext } from "@hello-pangea/dnd";
import { Container, Grid, Group, Stack, Text } from "@mantine/core";

import { INITIAL_BOARD } from "./lib";
import { BoardColumn } from "./ui";

export const Board = () => {
  const [board] = useState(INITIAL_BOARD);

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
              </Grid.Col>
            ))}
          </Grid>
        </DragDropContext>
      </Stack>
    </Container>
  );
};
