import { Container, Grid, Group, Stack, Text } from "@mantine/core";

import { BoardColumn } from "~/shared/board-column";

export const Board = () => (
  <Container size="md" py="md">
    <Stack>
      <Group w="100%">
        <Text>Board</Text>
      </Group>
      <Grid grow gutter="md">
        <Grid.Col span={4}>
          <BoardColumn title="To Do" color="teal.1" />
        </Grid.Col>
        <Grid.Col span={4}>
          <BoardColumn title="In Progress" color="grape.1" />
        </Grid.Col>
        <Grid.Col span={4}>
          <BoardColumn title="Done" color="gray.1" />
        </Grid.Col>
      </Grid>
    </Stack>
  </Container>
);
