import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const SavePlaylistAlert: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      {isOpen && (
        <Alert
          status="success"
          position="fixed"
          bottom="20px"
          width="auto"
          right="20px"
        >
          <AlertIcon />
          <AlertTitle mr={2}>Success 🙌</AlertTitle>
          <AlertDescription>Your Playlist has been saved!</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={onClose}
          />
        </Alert>
      )}
      {/* Button to trigger the alert */}
      <button onClick={onOpen}>Show Alert</button>
    </>
  );
};

export default SavePlaylistAlert;
