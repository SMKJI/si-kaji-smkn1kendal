
import React, { useEffect } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import InfoSection from '@/components/home/InfoSection';
import Footer from '@/components/layout/Footer';

const HomePage = () => {
  useEffect(() => {
    // Log untuk debugging
    console.log("HomePage component rendered");
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set document title
    document.title = 'Si-Kaji - Sistem Informasi Kesiswaan SMKN 1 Kendal';
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <InfoSection />
          <Features />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default HomePage;
