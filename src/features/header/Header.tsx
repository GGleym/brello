import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import classes from "./Header.module.css";
import { Tabs, UserInfo } from "./ui";

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <div>Brello</div>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <UserInfo />
        </Group>
      </Container>
      <Container size="md">
        <Tabs />
      </Container>
    </div>
  );
};
