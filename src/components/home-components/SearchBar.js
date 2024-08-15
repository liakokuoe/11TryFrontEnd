import React from 'react';

// SearchBar component definition
const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className="search-bar">
      {/* Input field for search term */}
      <input
        type="text"
        placeholder="Search for items..."
        value={searchTerm} // Controlled component value
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
      />
      {/* Button to trigger search */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;