import React from 'react';


const StatusBox = () => {
  return (
    <div className="status-container">
      <div className="status-box">
        <div className="status-dot"></div>
        <div className="status-text">
          <span className="text-line-one">Working on</span>
          <span className="text-line-one"></span>
        </div>
        <div className="status-text-main">
          <span className="text-line-two">Generative AI, Intelligent Agents</span>
          <span className="text-line-two"></span>
        </div>
      </div>
    </div>
  );
};

export default StatusBox;