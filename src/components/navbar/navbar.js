import React, { useEffect, useState } from "react";
import WalletConnect from "../buttonConnect/button";
import "./navbar.css";
import { useWeb3React } from "@web3-react/core";
import { Text, Box } from "@chakra-ui/react";

import { utils } from "ethers";
import { connectors } from "../../connectors";
function Navbar() {
  const { library, account } = useWeb3React();
  const [accountBalance, setAccountBalance] = useState();
  const etherBalance = async () => {
    if (!library) return;
    let balance = await library.getBalance(account);
    setAccountBalance(await balance);
  };



  useEffect(() => {
    const interval = setInterval(() => {
      etherBalance();
    },10000);
    return () => clearInterval(interval);
  }, [account]);
  return (
    <div className="conteiner">
      <div className="account-info">
        {account ? (
          <Box
            display="flex"
            alignItems="center"
            width="fit-content"
            background="gray.100"
            borderRadius="xl"
            py="0"
          >
            <Box px="3">
              <Text color="grey.800" fontSize="md">
                {accountBalance &&
                  parseFloat(utils.formatEther(accountBalance)).toFixed(3)}{" "}
                ETH
              </Text>
            </Box>
            <Box
              bg="gray.300"
              border="1px solid transparent"
              borderRadius="xl"
              m="1px"
              px={3}
              height="38px"
              display="flex"
              alignItems="center"
              width="fit-content"
            >
              <Text color="grey.800" fontSize="md" fontWeight="medium">
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Text>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </div>
      <div className="button-connect">
        <WalletConnect />
      </div>
    </div>
  );
}

export default Navbar;
