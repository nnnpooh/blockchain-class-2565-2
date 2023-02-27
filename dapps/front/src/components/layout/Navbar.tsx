import { FC } from "react";
import { Button, Container } from "@mantine/core";
import { IconSeeding, IconUser } from "@tabler/icons";
import type { NextPage } from "next";
// import { useRouter } from "next/router";
import { useWorkingStore } from "@src/utils/working-store";
import { ethers } from "ethers";

const Navbar: NextPage = () => {
  // const router = useRouter();
  const [account, isEthereumAvailable] = useWorkingStore((state) => [
    state.account,
    state.isEthereumAvailable,
  ]);

  return (
    <div className="bg-gray-50 py-4">
      <Container size="xl">
        <div className="flex items-center justify-between">
          <IconSeeding />
          <AccountButton />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

const AccountButton: FC = () => {
  const [account, network, setAccount, isEthereumAvailable] = useWorkingStore(
    (state) => [
      state.account,
      state.network,
      state.setAccount,
      state.isEthereumAvailable,
    ]
  );

  function handleClick() {
    if (!window.ethereum) return;
    window.ethereum.request({ method: "eth_requestAccounts" }).then(
      (accounts) => {
        // Not really needed here but just to make sure
        console.log("accounts", accounts);
        if (accounts && Array.isArray(accounts)) setAccount(accounts[0] || "");
      },
      (error) => {}
    );
  }

  if (!isEthereumAvailable) {
    return <div>Please Install MetaMask</div>;
  }
  if (!account) {
    return (
      <Button className="bg-blue-300" onClick={handleClick}>
        Connect
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-1 rounded-md bg-gray-400 px-3 py-2  text-sm italic text-white hover:bg-rose-800">
      <IconUser size={18} />
      {account}
      {JSON.stringify(network)}
    </div>
  );
};
