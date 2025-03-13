
import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import SidebarTrigger from '@/components/layout/SidebarTrigger';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home, User, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider } from '@/contexts/SidebarContext';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  backTo?: string;
  backLabel?: string;
  userRole?: 'admin' | 'teacher' | 'student' | 'parent' | string;
  userName?: string;
  userAvatar?: string;
}

const DashboardLayout = ({
  children,
  title,
  description,
  showBackButton = false,
  backTo = "/dashboard",
  backLabel = "Kembali",
  userRole = "student",
  userName = "User",
  userAvatar = "",
}: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  const getRoleBadge = () => {
    switch(userRole) {
      case 'admin':
        return <Badge className="bg-purple-500">Admin</Badge>;
      case 'teacher':
        return <Badge className="bg-blue-500">Guru</Badge>;
      case 'student':
        return <Badge className="bg-green-500">Siswa</Badge>;
      case 'parent':
        return <Badge className="bg-orange-500">Wali Murid</Badge>;
      default:
        return <Badge>{userRole}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow flex">
            <Sidebar userRole={userRole} />
            <main className="flex-1 container mx-auto px-4 py-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    
                    {showBackButton && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 pl-1 h-9"
                        onClick={handleBack}
                      >
                        <ChevronLeft size={16} />
                        <span className="hidden sm:inline">{backLabel}</span>
                      </Button>
                    )}
                    
                    <div className="flex-shrink-0">
                      <Link to="/dashboard">
                        <Button variant="outline" size="sm" className="gap-1 h-9">
                          <Home size={14} />
                          <span className="hidden sm:inline">Dashboard</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                      {getRoleBadge()}
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={userAvatar} />
                          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium hidden md:inline">{userName}</span>
                      </div>
                    </div>
                    <Link to="/settings">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                  {description && (
                    <p className="text-muted-foreground mt-1">{description}</p>
                  )}
                </div>
                
                {children}
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </PageTransition>
    </SidebarProvider>
  );
};

export default DashboardLayout;
