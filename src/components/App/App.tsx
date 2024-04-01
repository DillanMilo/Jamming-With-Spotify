import { useState } from "react";
import "./App.css";
import SearchBar from "./SearchResults/SearchResults";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <SearchBar /> {/* Add the SearchBar component */}
      <h1>Welcome to Jammming</h1>
      {/* ... rest of your code ... */}
    </div>
  );
}

export default App;
