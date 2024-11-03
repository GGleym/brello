import { Paper, Text } from "@mantine/core";

type TCardProps = {
  /** Текст карточки */
  text?: string;
};

export const Card = ({ text = "Текст" }: TCardProps) => (
  <Paper p="md" shadow="xs">
    <Text>{text}</Text>
  </Paper>
);
