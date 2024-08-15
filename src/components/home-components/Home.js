import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import ThriftItemList from './ThriftItemList.js';

// Home component definition
const Home = () => {
  // useState hooks to manage state for thrift items and search term
  const [thriftItems, setThriftItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // useEffect hook to fetch thrift items when the component mounts
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/thrift-items`)
      .then(response => {
        // Set the fetched thrift items to state
        setThriftItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the thrift items!", error);
      });
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle deleting an item
  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/thrift-items/${id}`)
      .then(response => {
        // Filter out the deleted item from the state
        setThriftItems(thriftItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the thrift item!", error);
      });
  };

  // Function to handle editing an item
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Function to handle searching items
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      axios.get(`${process.env.REACT_APP_API_URL}/api/thrift-items`)
        .then(response => {
          // Set all thrift items to state
          setThriftItems(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the thrift items!", error);
        });
    } else {
      // Filter items based on the search term
      const filteredItems = thriftItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setThriftItems(filteredItems);
    }
  };

  // Function to handle bidding on an item
  const handleBid = (id, newBid, bidderName) => {
    const item = thriftItems.find(item => item._id === id);
    if (!item) {
      console.error("Item not found!");
      return;
    }
  
    if (newBid > item.currentBid) {
      axios.put(`${process.env.REACT_APP_API_URL}/api/thrift-items/bid/${id}`, { currentBid: newBid, bidderName })
        .then(response => {
          setThriftItems(thriftItems.map(item => item._id === id ? response.data : item));
        })
        .catch(error => {
          console.error("There was an error updating the bid!", error.response.data);
        });
    } else {
      alert("Bid amount must be higher than the current bid.");
    }
  };

  // JSX for rendering the Home component
  return (
    <div className="main-content home">
      <h1>Place Your Bids!</h1>
      {/* Render the SearchBar component */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      {/* Render the ThriftItemList component */}
      <ThriftItemList 
        thriftItems={thriftItems} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit} 
        handleBid={handleBid} 
      />
    </div>
  );
}

export default Home;