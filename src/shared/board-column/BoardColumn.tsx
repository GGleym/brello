import { Button, CheckIcon, type MantineColor, Paper, Stack, Title } from "@mantine/core";

import { Card } from "./ui";

type TBoardColumnProps = {
  /** Заголовок колонки */
  title: string;
  /** Цвет колонки */
  color: MantineColor;
};

export const BoardColumn = ({ title, color }: TBoardColumnProps) => (
  <Paper p="md" bg={color} radius="md">
    <Title order={4} mb="md">
      {title}
    </Title>
    <Stack gap="xs">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Button fullWidth color={color.split(".").shift()} variant="light" mt="sm" leftSection={<CheckIcon size={14} />}>
        Add card
      </Button>
    </Stack>
  </Paper>
);
