import React, { useState } from "react";
import "./mainContent.css";
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

const REFLINK = 'https://fried-bacon.io/#/?ref=';

function MainContent() {
  const [ethValue, setEthValue] = useState(0);

  return (
    <>
      <div className="conteiner-main-content">
        <div className="main-section box">
          <VStack width="100%">
            <Box width="90%" display="flex" mt={50}>
              <Text textAlign="left">Wallet ETH:</Text>

              <Text flex="1" textAlign="right">
                0
              </Text>
            </Box>
            <Box width="90%" display="flex" mt="25px !important">
              <Text textAlign="left">Your miners:</Text>
              <Text flex="1" textAlign="right">
                0
              </Text>
            </Box>
            <Box width="90%" display="flex" mt="25px !important">
              <Text textAlign="left">Daily return up to:</Text>
              <Text flex="1" textAlign="right">
                ~10%
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
              <Button mt={15} width="100%">
                Hire Farmers
              </Button>
            </Box>
            <HStack mt="25px !important" width="90%">
              <Box
                background="gray.100"
                width="100%"
                height="auto"
                padding="9px"    
                fontSize={14}
                borderRadius="5px"    
                color="gray.400"  
                textTransform='none'    >
                {REFLINK}
              </Box>
              <Button>Copy</Button>
            </HStack>
          </VStack>
        </div>
        <div className="reward-info-section">
          <div className="rewards box"></div>
          <div className="info box"></div>
        </div>
        <div className="miner-rules box"></div>
      </div>
    </>
  );
}

export default MainContent;
