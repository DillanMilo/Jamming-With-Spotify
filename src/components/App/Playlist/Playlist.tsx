import React from "react";
import { Box, Heading, VStack, Button, Input } from "@chakra-ui/react";
import Track from "../Track/Track";
import { TrackType } from "../Types";

type PlaylistProps = {
  tracks: TrackType[];
  onRemove: (track: TrackType) => void;
  onSave: () => void;
  playlistName: string;
  onNameChange: (name: string) => void;
};

const Playlist = ({
  tracks,
  onRemove,
  onSave,
  playlistName,
  onNameChange,
}: PlaylistProps) => {
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} m={4}>
      <Heading as="h3" size="lg" mb={4}>
        {playlistName}
      </Heading>
      <VStack spacing={4}>
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onRemove={onRemove}
            isRemoval={true} // Pass the isRemoval prop as true for tracks in the playlist
          />
        ))}
      </VStack>
      <Button
        colorScheme="green"
        mt={4}
        justifyContent="center"
        onClick={onSave}
      >
        Save to Spotify
      </Button>
    </Box>
  );
};

export default Playlist;
