
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { mainMenu, MenuItemType } from '@/lib/sidebar-menu';
import { useSidebar } from '@/contexts/SidebarContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  userRole: 'admin' | 'teacher' | 'student' | 'parent' | string;
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();
  const { isOpen, toggle } = useSidebar();
  
  // Filter menu items for the current user role
  const filteredMenu = mainMenu.filter((item) => 
    item.roles.includes(userRole as any)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => toggle()}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen bg-sidebar-background border-r border-sidebar-border z-50 transition-all duration-300 flex flex-col",
          isOpen ? "w-64" : "w-0 md:w-16",
        )}
      >
        {/* Toggle button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute -right-4 top-16 h-8 w-8 rounded-full border shadow-md hidden md:flex"
          onClick={toggle}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>

        {/* Logo & header */}
        <div className={cn(
          "h-16 md:h-[73px] flex items-center px-4 border-b border-sidebar-border",
          !isOpen && "md:justify-center"
        )}>
          <Link to="/dashboard" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/0a3a3f77-6e29-472b-9596-b9b4a52df4b0.png" 
              alt="Logo" 
              className="h-8 w-8" 
            />
            <span className={cn(
              "font-semibold text-lg text-sidebar-primary transition-opacity duration-200",
              !isOpen && "md:hidden"
            )}>Si-Kaji</span>
          </Link>
        </div>

        {/* Menu */}
        <ScrollArea className="flex-1 pt-4 pb-6">
          <nav className="px-2 space-y-1">
            {filteredMenu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary",
                  !isOpen && "md:justify-center"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "transition-opacity duration-200",
                  !isOpen && "md:hidden"
                )}>
                  {item.title}
                </span>
                {!isOpen && (
                  <span className="hidden md:inline-flex absolute left-full rounded-md bg-primary text-primary-foreground text-xs px-2 py-1 ml-6 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                    {item.title}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        {/* Mobile close button */}
        <div className="md:hidden border-t border-sidebar-border p-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={toggle}
          >
            <ChevronLeft size={16} />
            <span>Tutup Menu</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
