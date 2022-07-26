import { useEffect, useState } from "react";
import MainContent from "./components/mainContent/mainContent";
import Navbar from "./components/navbar/navbar";
import "./App.css";
import { connectors } from "./connectors";
import { useWeb3React } from "@web3-react/core";
import { toHex } from "../../utils";
import { networkParams } from "../../networks";
export default function App() {
  const { chainId, library, activate, active } = useWeb3React();
  const [error, setError] = useState("");
  
  const switchNetwork = async (network) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      }
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
    const { ethereum } = window;
    const provider = window.localStorage.getItem("provider");
    if (ethereum && ethereum.on && !active && !error) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(connectors[provider]);
      };
      const handleChainChanged = (chainIdWindow) => {
        if (chainId !== 5) {
          switchNetwork(5)
        }
        console.log("Handling 'chainChanged' event with payload", chainIdWindow);
        activate(connectors[provider]);
      };
      const handleAccountsChanged = (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        console.log(accounts);
        if (accounts.length > 0) {
          activate(connectors[provider]);
        }
      };
      const handleNetworkChanged = (networkId) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(connectors[provider]);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, activate]);
  return (
    <>
      <Navbar />
      <div className="app-main">
        <MainContent />
      </div>
    </>
  );
}
