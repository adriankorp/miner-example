import { useEffect } from "react";
import MainContent from "./components/mainContent/mainContent";
import Navbar from "./components/navbar/navbar";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { connectors } from "./connectors";
import { useWeb3React } from "@web3-react/core";
import { toHex } from "./utils";

export default function App() {
  const { library, activate } = useWeb3React();

  const switchNetwork = async (network) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      console.log(switchError);
    }
  };

  useEffect(() => {
    const connectOnRefresh = async () => {
      const provider = window.localStorage.getItem("provider");
      if (provider) {
        try {
          await activate(connectors[provider]);
        } catch (er) {
          console.error(er);
        }
      }
    };
    connectOnRefresh();
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      if (window.ethereum !== 0x5) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(5) }],
        });
      }
    }, 2000);
  }, []);

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");

    const handleChainChanged = async (chain) => {
      console.log(chain);
      if (chain !== 0x5) switchNetwork(5);
    };

    if (provider) {
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  });

  return (
    <>
      <Navbar />
      <div className="app-main">
        <MainContent />
      </div>
      <Toaster />
    </>
  );
}
