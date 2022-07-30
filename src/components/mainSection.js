import React, { useState } from "react";
import { VStack, Button, Text, Input, Box } from "@chakra-ui/react";
import "./mainContent/mainContent.css";
import { useWeb3React } from "@web3-react/core";
import toast from "react-hot-toast";
import { ethers } from "ethers";

function MainSection(props) {
  const [ethValue, setEthValue] = useState(0);
  const { account } = useWeb3React();
  async function buy() {
    if (!account) {
      return;
    }

    if (Number(props.accountBalance) < Number(ethValue)) {
      toast.error("Insufficient ETH");
      return;
    }

    if (props.myEarns > 0.0001 && ethValue * 1 >= 0.01) {
      toast(
        "Keep in mind that if you are hiring miners and you already have a ETH reward, then your reward will be automatically reinvested",
        {
          icon: "ℹ️",
        }
      );
    }

    if (ethValue * 1 < 0.01) {
      toast.error("Minimum deposit amount 0.01 ETH");
      return;
    }
    try {
      const callValue = ethers.utils.parseEther(ethValue);
      const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
      let affrAddr = urlParams.get("ref");

      let inviter = "0x2E0596c9cbE6bd0D4188298EbE2F38256f99AF20";
      if (ethers.utils.isAddress(affrAddr)) {
        inviter = affrAddr;
      }

      let tx = await props.contract
        .buyMiners(inviter, { value: callValue })
        .catch((err) => {
          toast.error(err.message, 3);
          console.log(err);
        });

      if (tx) {
        toast.success("Transaction sent", 3);
        await tx.wait();
        toast.success("Transaction confirmed", 3);
      }


    } catch (e) {
      console.log(e);
    }
  }

  return (
    <VStack width="100%" className="box" padding={5}>
      <Box width="90%" display="flex" mt={25}>
        <Text textAlign="left">Wallet ETH:</Text>

        <Text flex="1" textAlign="right">
          {props.accountBalance}
        </Text>
      </Box>
      <Box width="90%" display="flex" mt="25px !important">
        <Text textAlign="left">Your miners:</Text>
        <Text flex="1" textAlign="right">
          {props.miners}
        </Text>
      </Box>
      <Box width="90%" display="flex" mt="25px !important">
        <Text textAlign="left">Daily return up to:</Text>
        <Text flex="1" textAlign="right">
          10%
        </Text>
      </Box>
      <Box width="90%" mt="25px !important">
        <Input
          background="gray.100"
          type="number"
          min="0"
          placeholder="ETH"
          textAlign="center"
          onChange={(e) => setEthValue(e.target.value)}
        ></Input>
        <Button mt={15} width="100%" onClick={buy}>
          Hire Miners
        </Button>
      </Box>
    </VStack>
  );
}

export default MainSection;
