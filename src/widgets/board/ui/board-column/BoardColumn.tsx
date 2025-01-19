import { PropsWithChildren } from "react";

import { Droppable } from "@hello-pangea/dnd";
import { Paper, Stack, Title } from "@mantine/core";

import { type TBoardListItem } from "../../lib/types";
import { Card } from "./ui";

export const BoardColumn = ({ id: columnId, title, cards, children }: PropsWithChildren<TBoardListItem>) => (
  <Droppable key={columnId} droppableId={columnId}>
    {({ droppableProps, innerRef, placeholder }) => (
      <div ref={innerRef} {...droppableProps}>
        <Paper p="md" bg="teal.1" radius="md">
          <Title order={4} mb="md">
            {title}
          </Title>
          <Stack gap="xs">
            {cards.map(({ id, title }, index) => (
              <Card columnId={columnId} key={id} id={id} title={title} index={index} />
            ))}
            {placeholder}
            {children}
          </Stack>
        </Paper>
      </div>
    )}
  </Droppable>
);
