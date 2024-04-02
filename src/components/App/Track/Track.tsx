// In Track.tsx
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { TrackType } from "../Types";

type TrackProps = {
  track: TrackType;
  onAdd?: (track: TrackType) => void;
  onRemove?: (track: TrackType) => void;
};

const Track = ({ track, onAdd, onRemove }: TrackProps) => {
  return (
    <Box bg="gray.800" borderRadius="md" padding="4" boxShadow="md">
      <Image borderRadius="md" src={track.albumImageUrl} alt={track.album} />
      <Text mt="2" fontWeight="bold">
        {track.title}
      </Text>
      <Text fontSize="sm">{track.artist}</Text>
      {onAdd && (
        <Button
          mt="4"
          leftIcon={<AddIcon />}
          colorScheme="green"
          size="sm"
          onClick={() => onAdd(track)}
        >
          Add to Playlist
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
          Remove from Playlist
        </Button>
      )}
    </Box>
  );
};

export default Track;
