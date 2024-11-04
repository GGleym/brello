import { Tabs as MantineTabs } from "@mantine/core";

import classes from "./Tabs.module.css";
import { TABS } from "./lib";

export const Tabs = () => {
  const items = TABS.map((tab) => (
    <MantineTabs.Tab value={tab} key={tab}>
      {tab}
    </MantineTabs.Tab>
  ));

  return (
    <MantineTabs
      defaultValue="Home"
      variant="outline"
      visibleFrom="sm"
      classNames={{
        root: classes.TABS,
        list: classes.tabsList,
        tab: classes.tab,
      }}
    >
      <MantineTabs.List>{items}</MantineTabs.List>
    </MantineTabs>
  );
};
