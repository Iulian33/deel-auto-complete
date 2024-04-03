import { AutoCompleteInput } from "./components/AutoCompleteInput";
import { fetchUsernames } from "./api/fetchUsernames.ts";

function App() {
  return (
    <div>
      <h1>AutoComplete Component</h1>
      <AutoCompleteInput
        searchRequestData={fetchUsernames}
        placeholder="Search for users..."
      />
    </div>
  );
}

export default App;
