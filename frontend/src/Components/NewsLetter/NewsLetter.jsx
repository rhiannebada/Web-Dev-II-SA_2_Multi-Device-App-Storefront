import React, { useState } from 'react';
import './NewsLetter.css';

// NewsLetter functional component
const NewsLetter = () => {
  const [email, setEmail] = useState(''); // useState hook to manage the email state, starting with an empty string

  // Handle subscribe button click
  const handleSubscribe = () => {
    // Logic to send email to the backend can be placed here
    console.log('Subscribed with email:', email);

    // Clear the input field after subscribing
    setEmail('');
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          placeholder="Your Email id"
          value={email} // Set the input value to the state
          onChange={(e) => setEmail(e.target.value)} // Update the state when the input changes
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter; // export the component for use in other files
