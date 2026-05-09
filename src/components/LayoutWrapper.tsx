'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function LayoutWrapper({ 
  children, 
  isAuthenticated 
}: { 
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();
  
  // Define pages that should NOT show the sidebar
  const isLandingOrLogin = pathname === '/' || pathname === '/login';
  
  // Show sidebar only if authenticated AND not on landing/login pages
  const showSidebar = isAuthenticated && !isLandingOrLogin;

  return (
    <>
      {showSidebar && <Sidebar />}
      <main className={`flex-1 min-h-screen ${showSidebar ? 'ml-64 px-10 py-2' : ''}`}>
        {children}
      </main>
    </>
  );
}
