import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Track from "../Track/Track";
import { TrackType } from "../Types";

type SearchResultsProps = {
  searchResults: TrackType[];
};

const SearchResults = ({ searchResults }: SearchResultsProps) => {
  return (
    <Box padding="4" bg="gray.900" color="white">
      <Heading as="h2" size="lg" mb="4">
        Search Results
      </Heading>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing="4">
        {searchResults.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SearchResults;
