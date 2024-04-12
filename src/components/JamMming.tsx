// JammmingTitle.tsx
import React from "react";
import { Heading } from "@chakra-ui/react";

const JammmingTitle = () => {
  return (
    <Heading
      as="h1"
      size="2xl"
      color="purple.500"
      fontFamily="'Roboto Flex', sans-serif"
      fontWeight="bold"
      textShadow="4px 4px 8px rgba(0, 0, 0, 0.6)" // More pronounced shadow
    >
      Jam<span style={{ color: "#1DB954" }}>M</span>ming
    </Heading>
  );
};

export default JammmingTitle;
