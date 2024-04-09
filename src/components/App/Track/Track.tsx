import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { AddIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";
import { TrackType } from "../Types";

type TrackProps = {
  track: TrackType;
  onAdd?: (track: TrackType) => void;
  onRemove?: (track: TrackType) => void;
  isAdded?: boolean;
  isRemoval?: boolean;
};

const Track = ({ track, onAdd, onRemove, isAdded, isRemoval }: TrackProps) => {
  return (
    <Box bg="gray.800" borderRadius="md" p="4" boxShadow="md">
      <Text mt="2" fontWeight="bold">
        {track.title}
      </Text>
      <Text fontSize="sm">{track.artist}</Text>
      {!isRemoval ? (
        // This button is shown when the track is not in the playlist
        <Button
          mt="4"
          leftIcon={isAdded ? <CheckIcon /> : <AddIcon />}
          colorScheme={isAdded ? "purple" : "green"}
          size="sm"
          onClick={() => onAdd && onAdd(track)}
          isDisabled={isAdded}
        >
          {isAdded ? "Added" : "Add to Playlist"}
        </Button>
      ) : (
        // This button is shown when the track is in the playlist
        <Button
          mt="4"
          leftIcon={<MinusIcon />}
          colorScheme="red"
          size="sm"
          onClick={() => onRemove && onRemove(track)}
        >
          Remove from Playlist
        </Button>
      )}
    </Box>
  );
};

export default Track;
