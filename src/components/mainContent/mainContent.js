import React, { useEffect, useState } from "react";
import "./mainContent.css";
import { VStack, HStack, Box } from "@chakra-ui/react";
import Rewards from "../rewards";
import InfoBox from "../info";
import Referal from "../referal";
import MainSection from "../mainSection";
import { useWeb3React } from "@web3-react/core";
import { useMediaQuery } from "@chakra-ui/react";
import { ethers } from "ethers";
import { contractAddress } from "../../utils";
import { abi_miner } from "../../constans/contract";
function MainContent() {
  const [isSmallerThan950] = useMediaQuery("(max-width: 950px)");
  const { account, library, active } = useWeb3React();
  const [minerContract, setMinerContract] = useState();
  const [contractBalance, setContractBalance] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [myEarns, setMyEarns] = useState(0);
  const [myMiners, setMyMiners] = useState(0);

  const getContract = async () => {
    let minerContract = new ethers.Contract(
      contractAddress,
      abi_miner,
      await library.getSigner()
    );
    console.log(minerContract);
    setMinerContract(minerContract);
  };

  const getContractStats = async () => {
    if (!library) return;
    try {
      console.log("Refresh");
      let accountBalance = await library.getBalance(account);

      let contractBalance = await minerContract.getBalance();
      setAccountBalance(
        parseFloat(ethers.utils.formatEther(accountBalance.toString())).toFixed(
          3
        )
      );
      setContractBalance(
        parseFloat(
          ethers.utils.formatEther(contractBalance.toString())
        ).toFixed(3)
      );
      let miners = await minerContract.hatcheryMiners(account);
      setMyMiners(miners.toString());
      const myMinersSinceLastHatch = await minerContract.getMyMiners();

      if (myMinersSinceLastHatch > 0) {
        let earns = await minerContract.calculateMinersSell(
          myMinersSinceLastHatch
        );
        earns = parseFloat(ethers.utils.formatEther(earns.toString())).toFixed(
          4
        );

        if (earns < 0.000001) {
          setMyEarns(0);
        }
        setMyEarns(earns);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (active && account && !minerContract) getContract();
    if (minerContract) getContractStats();
    const interval = setInterval(() => {
      getContractStats();
    }, 5000);
    return () => clearInterval(interval);
  }, [minerContract, account, active]);

  return (
    <>
      {isSmallerThan950 ? (
        <VStack width="300px">
          <HStack alignItems="flex-start" flexWrap="wrap">
            <Box width="100%" mt={20}>
              <MainSection
                accountBalance={accountBalance}
                miners={myMiners}
                contract={minerContract}
                myEarns={myEarns}
              />
            </Box>

            <VStack width="100%" marginInlineStart="0px !important">
              <Box width="100%" mt={5}>
                <Rewards
                  contract={minerContract}
                  reward={myEarns}
                  accountBalance={accountBalance}
                  miners={myMiners}
                />
              </Box>
              <Box width="100%">
                <InfoBox contractBalance={contractBalance} />
              </Box>
            </VStack>
          </HStack>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            mt="20px !important"
          >
            <Referal account={account} />
          </Box>
        </VStack>
      ) : (
        <VStack width="900px" mt={55}>
          <HStack alignItems="flex-start" gap={4}>
            <Box width="100%">
              <MainSection
                accountBalance={accountBalance}
                miners={myMiners}
                contract={minerContract}
                myEarns={myEarns}
              />
            </Box>

            <VStack width="90%">
              <Box width="100%" height="fit-content">
                <Rewards
                  contract={minerContract}
                  reward={myEarns}
                  accountBalance={accountBalance}
                  miners={myMiners}
                />
              </Box>
              <Box width="100%">
                <InfoBox contractBalance={contractBalance} />
              </Box>
            </VStack>
          </HStack>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            mt="20px !important"
          >
            <Referal account={account} />
          </Box>
        </VStack>
      )}
    </>
  );
}

export default MainContent;
