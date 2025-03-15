
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PageTransition from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("NotFoundPage component rendered");
    
    window.scrollTo(0, 0);
    document.title = 'Halaman Tidak Ditemukan - Si-Kaji';
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6 flex items-center justify-center">
          <div className="max-w-md w-full text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Halaman Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-6">
              Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
            </p>
            <Link to="/">
              <Button className="w-full sm:w-auto">Kembali ke Beranda</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;
