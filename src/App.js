import { useEffect, useState } from "react";
import Home from "./components/buttonConnect/button";
import MainContent from "./components/mainContent/mainContent";
import Navbar from "./components/navbar/navbar";
import "./App.css";
import { connectors } from "./connectors";
import { useWeb3React } from "@web3-react/core";
export default function App() {
  const { error, chainId, activate, active } = useWeb3React();

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
  },[]);

  useEffect(() => {
    const { ethereum } = window;
    const provider = window.localStorage.getItem("provider");
    if (ethereum && ethereum.on && !active && !error) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(connectors[provider]);
      };
      const handleChainChanged = (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
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
