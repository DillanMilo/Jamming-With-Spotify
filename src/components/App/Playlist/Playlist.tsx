import React from "react";
import { Box, Heading, VStack, Button, Text } from "@chakra-ui/react";
import { TrackType } from "../Types"; // Import the type definition

type PlaylistProps = {
  tracks: TrackType[];
};

const Playlist = ({ tracks }: PlaylistProps) => {
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} m={4}>
      <Heading as="h3" size="lg" mb={4}>
        Your Playlist
      </Heading>
      <VStack spacing={4}>
        {tracks.map((track) => (
          <Box key={track.id} p={3} shadow="md" borderWidth="1px">
            <Text fontWeight="bold">{track.title}</Text>
            <Text fontSize="sm">
              {track.artist} - {track.album}
            </Text>
          </Box>
        ))}
      </VStack>
      <Button colorScheme="green" mt={4}>
        Save to Spotify
      </Button>
    </Box>
  );
};

export default Playlist;
