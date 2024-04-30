import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { userFunction } from "../../../lib/users/userFunction";

declare global {
  interface Window {
    ethereum: any;
  }
}

export interface IWeb3State {
  address: string | null;
  currentChain: number | null;
  network: ethers.Network | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  isAuthenticated: boolean;
}

const useWeb3Provider = () => {
  const initialWeb3State = {
    address: null,
    currentChain: null,
    network: null,
    signer: null,
    provider: null,
    isAuthenticated: false,
  };

  const [state, setState] = useState<IWeb3State>(initialWeb3State);

  const connectWallet = useCallback(async () => {
    if (state.isAuthenticated) return;

    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.error("No browser wallet detected...")
      }

      const provider = new ethers.BrowserProvider(ethereum);

      const accounts: string[] = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const chain = Number(await (await provider.getNetwork()).chainId);
        const network = await provider.getNetwork()

        setState({
          ...state,
          address: accounts[0],
          signer,
          currentChain: chain,
          network,
          provider,
          isAuthenticated: true,
        });

        await userFunction(accounts[0])

        localStorage.setItem("isAuthenticated", "true");
      }
    } catch (error) {
      console.error(error)
    }
  }, [state]);

  const disconnect = () => {
    setState(initialWeb3State);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    if (window == null) return;

    if (localStorage.hasOwnProperty("isAuthenticated")) {
      connectWallet();
    }
  }, [connectWallet, state.isAuthenticated]);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      setState({ ...state, address: accounts[0] });
    });

    window.ethereum.on("networkChanged", (network: string) => {
      setState({ ...state, currentChain: Number(network) });
    });

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, [state]);

  return {
    connectWallet,
    disconnect,
    state,
  };
};

export default useWeb3Provider;