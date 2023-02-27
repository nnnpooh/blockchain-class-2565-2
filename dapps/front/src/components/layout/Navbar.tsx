import { Button, Container } from "@mantine/core";
import { Collapse, ScrollArea, ThemeIcon } from "@mantine/core";
import { Burger, Divider, Drawer, useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconSeeding, IconUser } from "@tabler/icons";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useWorkingStore } from "@src/store/working-store";
import { useAccount } from "./useAccount";
const Navbar: NextPage = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  const theme = useMantineTheme();

  useAccount();

  const [account] = useWorkingStore((state) => [state.account]);
  let navItems = [
    {
      text: "Home",
      onClick: () => router.push("/"),
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
                <IconUser size={18} />
                {account}
              </div>
            }
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
