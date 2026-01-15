import React from 'react';
import { View } from '../types';
import { Home, Coffee, Map as MapIcon, BookOpen, LifeBuoy } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  
  const navItems = [
    { id: View.DASHBOARD, label: 'Home', icon: Home },
    { id: View.MEALS, label: 'Meals', icon: Coffee },
    { id: View.ACADEMICS, label: 'Canvas', icon: BookOpen },
    { id: View.MAP, label: 'Map', icon: MapIcon },
    { id: View.SUPPORT, label: 'Support', icon: LifeBuoy },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-20 flex justify-between items-center">
        <button 
          onClick={() => setView(View.DASHBOARD)} 
          className="text-left focus:outline-none group"
          aria-label="Go to Home"
        >
          <h1 className="text-xl font-bold text-gray-800 tracking-tight transition-transform duration-200 group-hover:scale-105 origin-left">
            Uni<span className="text-primary-600">Life</span>
          </h1>
          <p className="text-xs text-gray-500">Dorm & Campus Companion</p>
        </button>
        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm transform transition-transform hover:scale-110 cursor-default">
          JD
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth no-scrollbar pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 h-16 absolute bottom-0 w-full z-30 flex justify-around items-center px-2 shadow-lg-up">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 hover:scale-110 active:scale-90 ${
                isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;