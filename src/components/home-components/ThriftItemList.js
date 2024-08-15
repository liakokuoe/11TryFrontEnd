import React from 'react';
import ThriftItem from './ThriftItem';

// ThriftItemList component definition
const ThriftItemList = ({ thriftItems, handleDelete, handleEdit, handleBid }) => {
  return (
    <ul className="furniture-items">
      {/* Map through thriftItems array and render a ThriftItem component for each item */}
      {thriftItems.map(thriftItem => (
        <ThriftItem 
          key={thriftItem._id} // Unique key for each item
          thriftItem={thriftItem} // Pass thriftItem data as a prop
          handleDelete={handleDelete} // Pass handleDelete function as a prop
          handleEdit={handleEdit} // Pass handleEdit function as a prop
          handleBid={handleBid} // Pass handleBid function as a prop
        />
      ))}
    </ul>
  );
};

export default ThriftItemList;