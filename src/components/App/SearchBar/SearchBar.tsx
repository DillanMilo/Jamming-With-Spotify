import { useState } from "react";
import { Input, InputGroup, Button, VStack, Link } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type SearchBarProps = {
  onSearch: (term: string) => void;
  onReset: () => void; // Add a new prop for resetting the search
  hasSearched: boolean; // Add a new prop to indicate if a search has been performed
};

const SearchBar = ({ onSearch, onReset, hasSearched }: SearchBarProps) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    onSearch(term);
  };

  const handleReset = () => {
    setTerm(""); // Clear the search term
    onReset(); // Call the reset function passed from the parent component
  };

  return (
    <VStack spacing={4}>
      <InputGroup>
        <Input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          borderColor="blue.400"
          borderWidth="1.5px"
          _hover={{ borderColor: "purple.500" }}
        />
      </InputGroup>
      {!hasSearched ? (
        <Button
          ml={2}
          colorScheme="green"
          px={8}
          onClick={handleSearch}
          _hover={{ bg: "green.400" }}
          opacity="0.8"
          _active={{
            opacity: "1",
          }}
        >
          <SearchIcon />
          Search
        </Button>
      ) : (
        <Link
          color="blue.500"
          textDecoration="underline"
          onClick={handleReset}
          _hover={{
            textDecoration: "none",
            color: "blue.600",
          }}
        >
          Back
        </Link>
      )}
    </VStack>
  );
};

export default SearchBar;
