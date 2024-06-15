import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative bg-custom-bg bg-cover bg-center overflow-hidden pb-10">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default Background;
