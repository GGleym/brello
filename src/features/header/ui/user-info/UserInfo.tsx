import { useState } from "react";

import { Avatar, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import cx from "clsx";

import classes from "./UserInfo.module.css";
import { USER } from "./lib";

export const UserInfo = () => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      withinPortal
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.USER, { [classes.userActive]: userMenuOpened })}>
          <Group gap={7}>
            <Avatar src={USER.image} alt={USER.name} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {USER.name}
            </Text>
            <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Liked posts</Menu.Item>
        <Menu.Item>Saved posts</Menu.Item>
        <Menu.Item>Your comments</Menu.Item>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};
