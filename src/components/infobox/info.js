import React from "react";

import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box,
} from "@chakra-ui/react";
function InfoBox() {
  return (
    <VStack fontSize={18} mt={3} >
      <Box display='left' textAlign='left' width='80%'>
        <Text >Contract TVL</Text>
        <Text mt={1}>0 ETH</Text>
        <Text mt={1}>APR</Text>
        <Text mt={1}>3600%</Text>
        <Text mt={1}>Dev fee</Text>
        <Text mt={1}>3%</Text>
      </Box>
    </VStack>
  );
}

export default InfoBox;
