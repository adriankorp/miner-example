import React from "react";

import { VStack, Text, Box } from "@chakra-ui/react";
function InfoBox(props) {
  return (
    <VStack fontSize={18} mt={3} className="box" p={2}>
      <Box display="left" textAlign="left" width="80%">
        <Text>Contract TVL</Text>
        <Text mt={1}>{props.contractBalance} ETH</Text>
        <Text mt={1}>APR</Text>
        <Text mt={1}>3600%</Text>
        <Text mt={1}>Dev fee</Text>
        <Text mt={1}>3%</Text>
      </Box>
    </VStack>
  );
}

export default InfoBox;
