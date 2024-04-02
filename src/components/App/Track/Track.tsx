import { Box, Image, Text, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { TrackType } from "../Types";

type TrackProps = {
  track: TrackType;
  onAdd: (track: TrackType) => void; // Add this line to include the onAdd function
};

const Track = ({ track, onAdd }: TrackProps) => {
  return (
    <Box bg="gray.800" borderRadius="md" padding="4" boxShadow="md">
      <Image borderRadius="md" src={track.albumImageUrl} alt={track.album} />
      <Text mt="2" fontWeight="bold">
        {track.title}
      </Text>
      <Text fontSize="sm">{track.artist}</Text>
      <Button
        mt="4"
        leftIcon={<AddIcon />}
        colorScheme="green"
        size="sm"
        onClick={() => onAdd(track)} // Call the onAdd function with the track's information
      >
        Add to Playlist
      </Button>
    </Box>
  );
};

export default Track;
