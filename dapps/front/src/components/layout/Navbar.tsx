import { Button, Container } from "@mantine/core";
import { Collapse, ScrollArea, ThemeIcon } from "@mantine/core";
import { Burger, Divider, Drawer, useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconSeeding, IconUser } from "@tabler/icons";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar: NextPage = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  const theme = useMantineTheme();

  let navItems = [
    {
      text: "Home",
      onClick: () => router.push("/"),
      allowUnauthenticated: true,
      allowRoles: [],
    },
    {
      text: "MKO",
      onClick: () => router.push("/mkos"),
      allowUnauthenticated: false,
      allowRoles: [],
    },

    {
      text: "Users",
      onClick: () => router.push("/users"),
      allowUnauthenticated: false,
      allowRoles: ["SUPER_ADMIN", "FACULTY_ADMIN"],
    },
  ];

  return (
    <div className="bg-gray-50 py-4">
      <Container size="xl">
        <div className="flex items-center justify-between">
          <IconSeeding />

          <div className="flex items-center gap-6">
            <div className="flex items-center">
              {navItems.map((n) => (
                <Button
                  onClick={n.onClick}
                  key={n.text}
                  className="hidden text-lg font-normal text-gray-500 transition-colors duration-300 ease-in-out hover:bg-rose-800 hover:text-white md:block"
                >
                  {n.text}
                </Button>
              ))}
            </div>

            {
              <div
                className="flex cursor-pointer items-center gap-1 rounded-md bg-gray-400 px-3 py-2  text-sm italic text-white hover:bg-rose-800"
                onClick={() => router.push("/me")}
              >
                {/* <IconUser size={18} /> */}
                Name
              </div>
            }

            {/* {
              <log.Icon
                onClick={log.onClick}
                className="hover:text-line-600 cursor-pointer text-gray-500 hover:text-rose-900"
              />
            } */}

            {/* <Burger
              className="md:hidden"
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              title={title}
            /> */}
          </div>
        </div>
      </Container>

      {/* <Drawer
        overlayColor={theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened((o) => !o)}
      >
        <div className="flex flex-col items-stretch justify-center gap-3 px-4">
          <div className="flex justify-center">
            <IconSeeding
              size={50}
              className="flex-none rounded-full border bg-rose-800 p-2 text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-rose-900"
            />
          </div>
          <Divider></Divider>
          {navItems.map((n) => (
            <Button
              onClick={() => {
                n.onClick();
                setOpened(false);
              }}
              key={n.text}
              className="text-lg font-normal text-gray-500 transition-colors duration-300 ease-in-out hover:bg-rose-800 hover:text-white"
            >
              {n.text}
            </Button>
          ))}
        </div>
      </Drawer> */}
    </div>
  );
};

export default Navbar;
