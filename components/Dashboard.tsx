import React from 'react';
import { View, Assignment, MealOption } from '../types';
import { Bell, ChevronRight, Clock, Coffee, MapPin } from 'lucide-react';

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden transform transition-transform hover:scale-[1.01] duration-300">
        <div className="relative z-10">
          <p className="text-indigo-200 text-sm font-medium">Good Morning,</p>
          <h2 className="text-2xl font-bold mt-1">Student</h2>
          <div className="mt-4 flex items-center space-x-2 text-sm bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors">
             <Bell size={14} />
             <span>2 New Notifications</span>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
           <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setView(View.MEALS)}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:border-primary-200 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
        >
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600 mb-3">
            <Coffee size={20} />
          </div>
          <span className="font-bold text-gray-800 text-sm">Next Meal</span>
          <span className="text-xs text-gray-500 mt-1">Lunch in 2h</span>
        </button>

        <button 
          onClick={() => setView(View.ACADEMICS)}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:border-primary-200 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
        >
           <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mb-3">
            <Clock size={20} />
          </div>
          <span className="font-bold text-gray-800 text-sm">Next Class</span>
          <span className="text-xs text-gray-500 mt-1">CS101 @ 2:00 PM</span>
        </button>
      </div>

      {/* Up Next / Reminders */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 text-lg">Today's Schedule</h3>
          <button onClick={() => setView(View.ACADEMICS)} className="text-primary-600 text-xs font-medium flex items-center transition-transform hover:scale-105 active:scale-95 origin-right">
            See All <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
           <div className="flex bg-white p-3 rounded-xl border border-gray-100 items-center hover:shadow-sm transition-shadow">
              <div className="w-12 flex flex-col items-center justify-center border-r border-gray-100 pr-3">
                 <span className="text-xs text-gray-400 font-medium">10:00</span>
                 <span className="text-xs text-gray-400 font-medium">AM</span>
              </div>
              <div className="pl-3 flex-1">
                 <h4 className="font-bold text-gray-800 text-sm">Study Group</h4>
                 <p className="text-xs text-gray-500 flex items-center mt-0.5"><MapPin size={10} className="mr-1"/> Library Rm 204</p>
              </div>
              <div className="w-2 h-10 rounded-full bg-indigo-500"></div>
           </div>

           <div className="flex bg-white p-3 rounded-xl border border-gray-100 items-center opacity-60">
              <div className="w-12 flex flex-col items-center justify-center border-r border-gray-100 pr-3">
                 <span className="text-xs text-gray-400 font-medium">08:30</span>
                 <span className="text-xs text-gray-400 font-medium">AM</span>
              </div>
              <div className="pl-3 flex-1">
                 <h4 className="font-bold text-gray-800 text-sm line-through">Calculus Lecture</h4>
                 <p className="text-xs text-gray-500 flex items-center mt-0.5">Completed</p>
              </div>
           </div>
        </div>
      </div>

      {/* Featured Meal Card (Prompt to book) */}
      <div className="bg-gray-900 rounded-2xl p-5 text-white relative overflow-hidden group">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <h3 className="font-bold text-lg">Dinner Special</h3>
            <p className="text-gray-400 text-sm mt-1">Grilled Salmon with Quinoa</p>
            <button 
              onClick={() => setView(View.MEALS)}
              className="mt-3 bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              Book Now
            </button>
          </div>
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300">
             <span className="text-2xl">🐟</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;