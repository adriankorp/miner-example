import React from "react";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { VStack, Button, Text } from "@chakra-ui/react";

function Rewards(props) {
  async function reInvest() {
    if (Number(props.accountBalance) < 0.001) {
      toast.error("Insufficient GAS FEE");
      return;
    }
    try {
      const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
      let affrAddr = urlParams.get("ref");

      let inviter = "0x2E0596c9cbE6bd0D4188298EbE2F38256f99AF20";
      if (ethers.utils.isAddress(affrAddr)) {
        inviter = affrAddr;
      }

      let tx = await props.contract
        .hatchMiners(inviter)
        .catch((err) => {
          toast.error(err.message, 3);
          console.log(err)});

      if (tx) {
        toast.success("Transaction sent", 3);
        await tx.wait();
        toast.success("Transaction confirmed", 3);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function sellMiners() {
    if (props.accountBalance * 1 < 0.001) {
      toast.error("Insufficient Gas");
      return;
    }
    console.log(props.miners)
    if (props.miners < 1) {
      toast.error("You don't have miners");
      return;
    }
    try {
      let tx = await props.contract.sellMiners().catch((err) => {
        toast.error(err.message, 3);
        console.log(err)});
 
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
    <>
      <VStack className="box" p={2}>
        <Text> Your rewards:</Text>
        <Text>{props.reward}</Text>

        <Button width="70%" mt="25px !important" onClick={reInvest}>
          RE-INVEST
        </Button>
        <Button width="70%" mb="10px !important"onClick={sellMiners}>
          GET ETH
        </Button>
      </VStack>
    </>
  );
}

export default Rewards;
