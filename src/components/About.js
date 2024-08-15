import React from 'react';

// About component definition
const About = (props) => (
  <div className="main-content">
    {/* Display the title passed as a prop */}
    <h1>{props.title}</h1>
    <p className="about-us">
      {/* Description of the thrift store */}
      Welcome to our Thrift Store! Your ultimate destination for discovering unique thrift items and placing bids to win your favorite finds. Our app connects thrifters with a wide array of pre-loved treasures, from vintage clothing and accessories to rare collectibles and home decor.
      We believe in the value of secondhand items and the stories they carry. Join our community of thrifters today and start uncovering hidden gems!
    </p>
  </div>
);

// Export the About component for use in other parts of the app
export default About;