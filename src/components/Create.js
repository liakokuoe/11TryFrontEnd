import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create component definition
const Create = (props) => {
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();
  
  // useState hook to manage the state of the new item being created
  const [item, setItem] = useState({
    name: '',
    description: '',
    startingBid: '',
    currentBid: '',
    auctionEnd: '',
    imageUrl: ''
  });

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the state with the new value for the input field that changed
    setItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to create the new item on the server
    axios.post(`${process.env.REACT_APP_API_URL}/api/thrift-items`, item)
      .then(() => {
        // Navigate back to the home page after successful creation
        navigate('/');  
      })
      .catch(error => {
        console.error("There was an error creating the thrift item!", error);
      });
  };

  // JSX for rendering the form to create a new item
  return (
    <div className="main-content">
      <h1>{props.title}</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Starting Bid:
          <input
            type="number"
            name="startingBid"
            value={item.startingBid}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Auction End Date:
          <input
            type="datetime-local"
            name="auctionEnd"
            value={item.auctionEnd}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            name="imageUrl"
            value={item.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default Create;