
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Admin Panel', icon: Settings, href: '/admin' },
    { label: 'Pengguna', icon: Users, href: '/admin/users' },
    { label: 'Kelas', icon: BookOpen, href: '/admin/classes' },
    { label: 'Pengaturan', icon: Settings, href: '/admin/config' },
    { label: 'Audit Log', icon: FileText, href: '/admin/audit' },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    toast({
      title: 'Berhasil keluar',
      description: 'Anda telah keluar dari sistem',
    });
    // Redirect to login page would happen here in a real app
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 w-full px-4 md:px-6 py-4 bg-background border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Mobile menu button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/0a3a3f77-6e29-472b-9596-b9b4a52df4b0.png" 
              alt="SMKN 1 Kendal Logo" 
              className="h-8 w-8 object-contain" 
            />
            <div className="flex flex-col">
              <span className="text-primary font-semibold text-lg leading-tight">Si-Kaji</span>
              <span className="text-muted-foreground text-xs">
                SMKN 1 Kendal
              </span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="text-muted-foreground"
          >
            <LogOut size={18} />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside 
          className={`hidden md:flex flex-col border-r bg-background transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="p-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="text-muted-foreground"
            >
              {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
          
          <nav className="flex-1 px-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`flex items-center py-2 px-3 text-sm rounded-md transition-colors hover:bg-muted space-x-3 ${
                      location.pathname === item.href ? 'bg-muted text-primary font-medium' : ''
                    }`}
                  >
                    <item.icon size={20} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-background">
            <div className="h-full flex flex-col pt-16 p-6">
              <nav className="flex-1">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={`flex items-center py-3 px-4 text-base rounded-md transition-colors hover:bg-muted space-x-3 ${
                          location.pathname === item.href ? 'bg-muted text-primary font-medium' : ''
                        }`}
                        onClick={toggleMobileMenu}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="pt-6 border-t">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center space-x-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Keluar</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
