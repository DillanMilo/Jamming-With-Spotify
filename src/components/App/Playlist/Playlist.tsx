import React from "react";
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import Track from "../Track/Track"; // Make sure this path is correct
import { TrackType } from "../Types"; // Update this path if necessary

type PlaylistProps = {
  tracks: TrackType[];
  onRemove: (track: TrackType) => void;
  onSave: () => void;
};

const Playlist = ({ tracks, onRemove }: PlaylistProps) => {
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} m={4}>
      <Heading as="h3" size="lg" mb={4}>
        Your Playlist
      </Heading>
      <VStack spacing={4}>
        {tracks.map((track) => (
          <Track key={track.id} track={track} onRemove={onRemove} />
        ))}
      </VStack>
      <Button colorScheme="green" mt={4}>
        Save to Spotify
      </Button>
    </Box>
  );
};

export default Playlist;
