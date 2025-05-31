import React, { ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div 
      className="min-h-screen bg-navy-900 relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-navy-900/90 backdrop-blur-sm"></div>
      <main className="relative container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};