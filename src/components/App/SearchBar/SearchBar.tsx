// In SearchBar.tsx
import { useState } from "react";
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type SearchBarProps = {
  onSearch: (term: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <InputGroup>
      {/* ... other elements ... */}
      <Input
        type="text"
        placeholder="Search songs, artists, albums..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        // ... other props ...
      />
      <Button ml={2} colorScheme="green" px={8} onClick={handleSearch}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
