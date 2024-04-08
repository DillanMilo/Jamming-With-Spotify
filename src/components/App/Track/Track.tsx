import React, { useState } from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import { AddIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";
import { TrackType } from "../Types";

type TrackProps = {
  track: TrackType;
  onAdd?: (track: TrackType) => void;
  onRemove?: (track: TrackType) => void;
  isPlaylist?: boolean;
};

const Track = ({ track, onAdd, onRemove, isPlaylist }: TrackProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddTrack = () => {
    if (onAdd) {
      onAdd(track);
      setIsAdded(true);
    }
  };

  return (
    <Box bg="gray.800" borderRadius="md" padding="4" boxShadow="md">
      {!isPlaylist && (
        <Image borderRadius="md" src={track.albumImageUrl} alt={track.album} />
      )}
      <Text mt="2" fontWeight="bold">
        {track.title}
      </Text>
      <Text fontSize="sm">{track.artist}</Text>
      <Text fontSize="sm">{track.album}</Text>
      {onAdd && !isAdded && (
        <Button
          mt="4"
          leftIcon={<AddIcon />}
          colorScheme="green"
          size="sm"
          onClick={handleAddTrack}
        >
          Add to Playlist
        </Button>
      )}
      {isAdded && (
        <Button
          mt="4"
          leftIcon={<CheckIcon />}
          colorScheme="purple"
          size="sm"
          isDisabled={true}
        >
          Added
        </Button>
      )}
      {onRemove && (
        <Button
          mt="4"
          leftIcon={<MinusIcon />}
          colorScheme="red"
          size="sm"
          onClick={() => onRemove(track)}
        >
          Remove
        </Button>
      )}
    </Box>
  );
};

export default Track;
