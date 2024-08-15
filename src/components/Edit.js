import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// Edit component definition
const Edit = () => {
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();
  // useParams hook to get the item ID from the URL
  const { id } = useParams();
  // useState hook to manage the state of the item being edited
  const [item, setItem] = useState({
    name: '',
    description: '',
    auctionEnd: '',
    imageUrl: ''
  });

  // useEffect hook to fetch the item's current data when the component mounts
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/thrift-items/${id}`)
      .then(response => {
        // Update the state with the fetched item data
        setItem(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the thrift item!", error);
      });
  }, [id]); // Dependency array includes id to refetch if id changes

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
    // Send a PUT request to update the item on the server
    axios.put(`${process.env.REACT_APP_API_URL}/api/thrift-items/edit/${id}`, item)
      .then(() => {
        // Navigate back to the home page after successful update
        navigate('/');  
      })
      .catch(error => {
        console.error("There was an error updating the thrift item!", error);
      });
  };

  // JSX for rendering the form to edit the item
  return (
    <div className="main-content">
      <h1>Edit Item</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Auction End Date:
          <input
            type="datetime-local"
            name="auctionEnd"
            value={item.auctionEnd}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            name="imageUrl"
            value={item.imageUrl}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default Edit;