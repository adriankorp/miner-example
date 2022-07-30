import { VStack, useDisclosure, Button, HStack } from "@chakra-ui/react";
import SelectWalletModal from "./buttonModal";
import { useWeb3React } from "@web3-react/core";

export default function ConnectWallet() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deactivate, active } = useWeb3React();

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  return (
    <>
      <VStack>
        <HStack>
          {!active ? (
            <Button onClick={onOpen}>Connect Wallet</Button>
          ) : (
            <Button onClick={disconnect}>Disconnect</Button>
          )}
        </HStack>
      </VStack>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}
