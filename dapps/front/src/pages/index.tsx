import { type NextPage } from "next";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  // const [account, setAccount] = useState<string | undefined>(undefined);
  // const [balance, setBalance] = useState<string | undefined>(undefined);
  // const [network, setNetwork] = useState<{
  //   id: number | null;
  //   name: string | null;
  // }>({
  //   id: null,
  //   name: null,
  // });
  // async function connect() {
  //   if (!window.ethereum) {
  //     alert("Please install MetaMask");
  //     return;
  //   }
  //   try {
  //     const provider = new ethers.providers.Web3Provider(
  //       window.ethereum as any //Look into this later
  //     );
  //     const accounts: string[] = await provider.send("eth_requestAccounts", []);
  //     if (accounts.length > 0) {
  //       setAccount(accounts[0]);
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  // const onClickDisconnect = () => {
  //   console.log("onClickDisConnect");
  //   setBalance(undefined);
  //   setAccount(undefined);
  // };

  // useEffect(() => {
  //   async function getInfo() {
  //     if (!account || !ethers.utils.isAddress(account)) return;
  //     if (!window.ethereum) return;
  //     const provider = new ethers.providers.Web3Provider(
  //       window.ethereum as any //Look into this later
  //     );
  //     const balanceRaw = await provider.getBalance(account);
  //     setBalance(ethers.utils.formatEther(balanceRaw));

  //     const nw = await provider.getNetwork();
  //     setNetwork({ id: nw.chainId, name: nw.name });
  //   }

  //   getInfo();
  // }, [account]);

  // useEffect(() => {
  //   if (!window.ethereum) {
  //     // Nothing to do here... no ethereum provider found
  //     return;
  //   }
  //   const accountWasChanged = (accounts: any) => {
  //     setAccount(accounts[0]);
  //     console.log("accountWasChanged");
  //   };
  //   const getAndSetAccount = async () => {
  //     const changedAccounts = await window.ethereum?.request({
  //       method: "eth_requestAccounts",
  //     });
  //     // setaccount(changedAccounts[0]);
  //     console.log("getAndSetAccount");
  //   };
  //   const clearAccount = () => {
  //     // setaccount("0x0");
  //     console.log("clearAccount");
  //   };
  //   window.ethereum.on("accountsChanged", accountWasChanged);
  //   window.ethereum.on("connect", getAndSetAccount);
  //   window.ethereum.on("disconnect", clearAccount);
  //   window.ethereum.request({ method: "eth_requestAccounts" }).then(
  //     (accounts) => {
  //       console.log("accounts", accounts);
  //       // No need to set account here, it will be set by the event listener
  //     },
  //     (error) => {
  //       // Handle any UI for errors here, e.g. network error, rejected request, etc.
  //       // Set state as needed
  //     }
  //   );
  //   return () => {
  //     // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
  //     window.ethereum?.removeListener("accountsChanged", accountWasChanged);
  //     window.ethereum?.removeListener("connect", getAndSetAccount);
  //     window.ethereum?.removeListener("disconnect", clearAccount);
  //   };
  // }, []);

  return (
    <div>
      {/* <div>{account}</div>
      <div>{balance}</div>
      <div>{network.id}</div>
      <div>{network.name}</div>

      <button onClick={connect}>Connect</button> */}
    </div>
  );
};

export default Home;
