// src/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';

// CountdownTimer component definition
const CountdownTimer = ({ auctionEnd }) => {
  // useState hook to manage the time left until the auction ends
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(auctionEnd));

  // useEffect hook to set up a timer that updates the time left every second
  useEffect(() => {
    // Set up an interval to update the time left every second
    const timerInterval = setInterval(() => {
      setTimeLeft(getTimeLeft(auctionEnd));
    }, 1000);

    // Clear the interval when the component is unmounted or auctionEnd changes
    return () => clearInterval(timerInterval);
  }, [auctionEnd]);

  // Function to calculate the time left until the auction ends
  function getTimeLeft(endDate) {
    const now = new Date();
    const timeDifference = new Date(endDate) - now;

    // If the time difference is less than or equal to 0, return 0 for all units
    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate the days, hours, minutes, and seconds left
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  // JSX for rendering the countdown timer
  return (
    <div className="timer-box">
      <div className="timer">
        <div className="timer-item">
          <span className="timer-value">{timeLeft.days}</span>
          <span className="timer-label">Days</span>
        </div>
        <div className="timer-item">
          <span className="timer-value">{timeLeft.hours}</span>
          <span className="timer-label">Hours</span>
        </div>
        <div className="timer-item">
          <span className="timer-value">{timeLeft.minutes}</span>
          <span className="timer-label">Minutes</span>
        </div>
        <div className="timer-item">
          <span className="timer-value">{timeLeft.seconds}</span>
          <span className="timer-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;