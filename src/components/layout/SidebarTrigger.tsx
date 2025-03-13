
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/contexts/SidebarContext';

const SidebarTrigger = () => {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden h-9 w-9 rounded-md"
      onClick={toggle}
    >
      <Menu size={20} />
      <span className="sr-only">Toggle menu</span>
    </Button>
  );
};

export default SidebarTrigger;
