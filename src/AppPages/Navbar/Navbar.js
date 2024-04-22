"use client";

import {
  Autocomplete,
  Burger,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Menu,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconExternalLink,
  IconPhoto,
  IconSearch,
  IconUserFilled,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Navbar.module.css";

const links = [
  { link: "/about", label: "Search Cars" },
  { link: "/about", label: "How To Buy" },
  {
    link: "#1",
    label: "Services",
    links: [{ link: "/docs", label: "Local pages" }],
  },
  {
    link: "#1",
    label: "More",
    links: [
      { link: "/docs", label: "Company Profile" },
      { link: "/docs", label: "Contact Us" },
    ],
  },
];

export const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <div className="container">
      <header className={classes.header}>
        <Grid justify={"space-between"}>
          <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                hiddenFrom="sm"
              />
              {/* <MantineLogo size={28} /> */}
              Logo
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <div className={classes.middelContainer}>
              {items}
              <Autocomplete
                className={classes.search}
                placeholder="Search"
                rightSection={
                  <IconSearch
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                data={[
                  "React",
                  "Angular",
                  "Vue",
                  "Next.js",
                  "Riot.js",
                  "Svelte",
                  "Blitz.js",
                ]}
                visibleFrom="xs"
              />
            </div>
          </Grid.Col>

          <Grid.Col span={{ lg: 2 }}>
            <Flex justify={"end"}>
              <Menu shadow="md">
                <Menu.Target>
                  <Button
                    leftSection={<IconUserFilled color="#f42f2f" size={14} />}
                  >
                    Hello, Your Name
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item>
                    <h2>Welcome To Pride Mile</h2>
                    <p>Join with us to access many features</p>
                  </Menu.Item>

                  <Grid display={Flex}>
                    <Grid.Col span={6}>
                      <Button
                        style={{ width: "100%" }}
                        className="headerBtn"
                        //   onClick={() => {
                        //     handleredirection();
                        //   }}
                      >
                        Dashboard
                      </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Button
                        style={{ width: "100%" }}
                        className="headerBtn"
                        //   onClick={() => {
                        //     handleLogout();
                        //   }}
                      >
                        Logout
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Grid.Col>
        </Grid>
      </header>
    </div>
  );
};
