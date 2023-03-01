import { FC } from "react";
import { Button, Container } from "@mantine/core";
import {
  IconUser,
  IconShieldLock,
  IconLink,
  IconCurrencyEthereum,
} from "@tabler/icons";
import type { NextPage } from "next";
import { useMetaMaskStore } from "@src/utils/stores";

const Navbar: NextPage = () => {
  return (
    <div className="bg-gray-50 py-4">
      <Container size="xl">
        <div className="flex items-center justify-between">
          <IconShieldLock
            size={50}
            className="cursor-pointer rounded-full border border-sky-800 p-2 text-sky-800 hover:bg-sky-500 hover:text-white"
          />
          <AccountButton />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

const AccountButton: FC = () => {
  const [account, network, setAccount, isEthereumAvailable, balance] =
    useMetaMaskStore((state) => [
      state.account,
      state.network,
      state.setAccount,
      state.isEthereumAvailable,
      state.balance,
    ]);

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
    return (
      <div className="rounded-md bg-red-300 p-2 text-sm italic text-white">
        Please Install MetaMask
      </div>
    );
  }
  if (!account) {
    return (
      <Button className="bg-blue-300" onClick={handleClick}>
        Connect
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      {network?.name && (
        <div className="flex items-center gap-1 rounded-md bg-gray-400 px-3 py-2 text-sm italic text-white">
          <IconLink size={18} />
          {network.name?.toUpperCase()}
        </div>
      )}
      <div className="flex items-center gap-1 rounded-md bg-gray-400 px-3 py-2 text-sm italic text-white">
        <IconUser size={18} />
        {account}
      </div>
      <div className="flex items-center gap-1 rounded-md bg-gray-400 px-3 py-2 text-sm italic text-white">
        <IconCurrencyEthereum size={18} />
        {balance}
      </div>
    </div>
  );
};
