import React, { useState } from "react";
import { Box, Heading, VStack, Button, Input } from "@chakra-ui/react";
import Track from "../Track/Track"; // Make sure this path is correct
import { TrackType } from "../Types"; // Update this path if necessary

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
  const [isEditing, setIsEditing] = useState(false);

  const handleNameEdit = () => {
    setIsEditing(true);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(event.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} m={4}>
      {isEditing ? (
        <Input
          value={playlistName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          size="lg"
          autoFocus
        />
      ) : (
        <Heading as="h3" size="lg" mb={4} onClick={handleNameEdit}>
          {playlistName}
        </Heading>
      )}
      <VStack spacing={4}>
        {tracks.map((track) => (
          <Track key={track.id} track={track} onRemove={onRemove} />
        ))}
      </VStack>
      <Button colorScheme="green" mt={4} onClick={onSave}>
        Save to Spotify
      </Button>
    </Box>
  );
};

export default Playlist;
