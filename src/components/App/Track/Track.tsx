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
    <Box className="track-box">
      <Button
        mt="4"
        leftIcon={isAdded ? <CheckIcon /> : <AddIcon />}
        className={isAdded ? "track-button-added" : "track-button-add"}
        size="sm"
        onClick={() => onAdd && onAdd(track)}
        isDisabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Playlist"}
      </Button>
    </Box>
  );
};

export default Track;
