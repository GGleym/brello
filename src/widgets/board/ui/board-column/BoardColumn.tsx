import { Droppable } from "@hello-pangea/dnd";
import { Button, Paper, Stack, Title } from "@mantine/core";
import { IconPlaylistAdd } from "@tabler/icons-react";

import { type TBoardListItem } from "../../lib/types";
import { Card } from "./ui";

export const BoardColumn = ({ id, title, cards }: TBoardListItem) => (
  <Droppable key={id} droppableId={id}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <Paper p="md" bg="teal.1" radius="md">
          <Title order={4} mb="md">
            {title}
          </Title>
          <Stack gap="xs">
            {cards.map(({ id, title }, index) => (
              <Card key={id} id={id} text={title} index={index} />
            ))}
            <Button fullWidth color="teal" variant="light" mt="sm" leftSection={<IconPlaylistAdd size={14} />}>
              Добавить
            </Button>
          </Stack>
        </Paper>
      </div>
    )}
  </Droppable>
);
