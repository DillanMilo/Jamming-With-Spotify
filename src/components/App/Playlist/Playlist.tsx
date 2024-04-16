import React, { useState } from "react";
import { Box, Heading, VStack, Button, Input } from "@chakra-ui/react";
import Track from "../Track/Track";
import { TrackType } from "../Types";

type PlaylistProps = {
  tracks: TrackType[];
  onRemove: (track: TrackType) => void;
  onSave: (name: string) => void; // Adjusted to accept the playlist name as a parameter
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
  const [editName, setEditName] = useState(playlistName); // Local state to handle the editable name

  // Update the local state and parent state when the input changes
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(event.target.value);
    onNameChange(event.target.value);
  };

  // Call the onSave prop with the current editName when the save button is clicked
  const handleSave = () => {
    onSave(editName);
  };

  return (
    <Box border="1px" borderColor="green.100" borderRadius="md" p={4} m={4}>
      <Input
        value={editName}
        onChange={handleNameChange}
        size="lg"
        mb={4}
        color="gray.500"
      />
      <VStack spacing={4}>
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onRemove={onRemove}
            isRemoval={true}
          />
        ))}
      </VStack>
      <Button colorScheme="green" mt={4} onClick={handleSave}>
        Save to Spotify
      </Button>
    </Box>
  );
};

export default Playlist;
