import { useState } from "react";
import "../../../styles/searchbar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://nct-api.vercel.app/product")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((item) => {
          return (
            value &&
            item &&
            item.title &&
            item.title.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <i className="ri-search-line"></i>
      <input
        placeholder="Tìm kiếm nhanh..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
