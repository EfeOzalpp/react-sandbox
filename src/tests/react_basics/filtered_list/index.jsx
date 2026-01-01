import { useState } from "react";

const list = ["apple", "banana", "orange", "grapes", "mango", "pineapple"];

export default function FilteredList() {
  const [query, setQuery] = useState("");

  const filteredFruits = list.filter((fruit) =>
    fruit.toLowerCase().includes(query.toLowerCase())
  );

  return (
   <div style={{ padding: 16, margin: 16 }}>

    <label>
      Filter fruits:
    <input 
      class="form-input"
      id="fruit-input"
      value={query} 
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Type to filter..."
      label="filter fruits"
      style={{display: "block", marginTop: "8", marginBottom: "12" }}
      />
    </label>

  {filteredFruits.length === 0 ? (<p>No results found</p>) : 
  (<ul>
    {filteredFruits.map((fruit) => (
      <li key={fruit}>{fruit}</li>
    ))}
    </ul>
  )}
   </div>
  );
}
