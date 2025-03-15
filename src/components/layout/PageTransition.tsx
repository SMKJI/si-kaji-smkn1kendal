
import React, { ReactNode, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
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
