import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

export const Home = () => {
  return (
    <div className="homediv">
      <div className="name">
        <p>Invoice Generator <br></br>Application</p>
      </div>
      <Link to="/invoice" className="button">
        Get Started
      </Link>
    </div>
  );
};
