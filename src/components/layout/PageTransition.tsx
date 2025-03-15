
import React, { ReactNode, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Log untuk memastikan komponen dirender
  useEffect(() => {
    console.log("PageTransition component rendered");
  }, []);

  return (
    <div className="animate-fade-in w-full">
      {children}
    </div>
  );
};

export default PageTransition;
