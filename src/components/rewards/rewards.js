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

function Rewards() {
  return <>
  <VStack mt={50}>
    <Text> Your rewards:</Text>
    <Text>0</Text>
    
    <Button width='70%' mt="35px !important">RE-INVEST</Button>
    <Button width='70%'>GET ETH</Button>
  </VStack>
  </>;
}

export default Rewards;
