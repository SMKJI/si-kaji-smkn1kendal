
import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  backTo?: string;
  backLabel?: string;
}

const DashboardLayout = ({
  children,
  title,
  description,
  showBackButton = false,
  backTo = "/dashboard",
  backLabel = "Kembali",
}: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <div className="flex flex-col gap-6">
            {showBackButton && (
              <div className="flex items-center gap-2 mb-0">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 pl-1"
                  onClick={handleBack}
                >
                  <ChevronLeft size={16} />
                  {backLabel}
                </Button>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                {description && (
                  <p className="text-muted-foreground mt-1">{description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Home size={14} />
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default DashboardLayout;
