import React from "react";
import { VStack, Button, Text, HStack, Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
const REFLINK = "https://miner-example.netlify.app/?ref=";
function Referal(props) {
  const [isSmallerThan950] = useMediaQuery("(max-width: 950px)");
  return (
    <>
      {isSmallerThan950 ? (
        <VStack width="100%" className="box" p={2}>
          <Text textAlign="left">Referal Program</Text>
          <VStack width="95%" mt="15px !important">
            <Box
              background="gray.100"
              width="100%"
              height="auto"
              padding="9px 4px 9px 4px"
              fontSize={14}
              borderRadius="5px"
              color="gray.400"
              textTransform="none"
              textAlign="center"
            >
              {props.account ? REFLINK + props.account : REFLINK}
            </Box>
            <Button
              width="100%"
              onClick={() =>
                navigator.clipboard.writeText(`${REFLINK + props.account}`)
              }
            >
              Copy
            </Button>
          </VStack>
          <Text fontSize={12} mt="17px !important" textAlign="center">
            Earn 10% of the Miners from anyone who uses your referral link used
            to open the mine!
          </Text>
        </VStack>
      ) : (
        <VStack width="100%" className="box" p={2}>
          <Text textAlign="left">Referal Program</Text>
          <HStack width="95%" mt="15px !important">
            <Box
              ml={10}
              background="gray.100"
              width="95%"
              height="auto"
              padding="9px 4px 9px 4px"
              fontSize={14}
              borderRadius="5px"
              color="gray.400"
              textTransform="none"
              textAlign="center"
            >
              {props.account ? REFLINK + props.account : REFLINK}
            </Box>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(`${REFLINK + props.account}`)
              }
            >
              Copy
            </Button>
          </HStack>
          <Text fontSize={12} mt="17px !important">
            Earn 10% of the Miners from anyone who uses your referral link used
            to open the mine!
          </Text>
        </VStack>
      )}
    </>
  );
}

export default Referal;
