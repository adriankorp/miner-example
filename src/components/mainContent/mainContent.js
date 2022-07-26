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
import Rewards from "../rewards/rewards";

const REFLINK = "0x8b41dc64c8eF2B01769097eBF8b85BAf1054f3F5";

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
          </VStack>
        </div>
        <div className="reward-info-section">
          <div className="rewards box">
            <Rewards></Rewards>
          </div>

          <div className="info box"></div>
        </div>
        <div className="referal box">
          <VStack width="100%" display="flex" justifyContent="center">
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
              >
                {REFLINK}
              </Box>
              <Button>Copy</Button>
            </HStack>
            <Text fontSize={12} mt="17px !important">
              Earn 10% of the Miners from anyone who uses your referral link
              used to open the mine!
            </Text>
          </VStack>
        </div>
      </div>
    </>
  );
}

export default MainContent;
