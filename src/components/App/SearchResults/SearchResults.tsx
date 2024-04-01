import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        type="text"
        placeholder="Search songs, artists, albums..."
        variant="filled"
        bg="gray.100"
        _hover={{
          bg: "gray.200",
        }}
        _focus={{
          bg: "white",
          borderColor: "green.500",
        }}
      />
      <Button
        ml={2}
        colorScheme="green"
        px={8}
        onClick={() => console.log("Search")}
      >
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
