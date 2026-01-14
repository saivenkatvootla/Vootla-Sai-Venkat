import React from 'react';
import { Assignment } from '../types';
import { BookOpen, Clock, AlertCircle, CheckCircle2, FileText, PieChart } from 'lucide-react';

const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: '1', course: 'CS101', title: 'Intro to Algorithms', dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), type: 'assignment', completed: false },
  { id: '2', course: 'MATH202', title: 'Calculus Midterm', dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), type: 'exam', completed: false },
  { id: '3', course: 'HIST150', title: 'Weekly Reflection', dueDate: new Date(new Date().setDate(new Date().getDate() - 1)), type: 'assignment', completed: true },
  { id: '4', course: 'PHYS101', title: 'Lab Report 4', dueDate: new Date(new Date().setDate(new Date().getDate() + 5)), type: 'assignment', completed: false },
  { id: '5', course: 'CS101', title: 'Binary Trees Quiz', dueDate: new Date(new Date().setDate(new Date().getDate() + 6)), type: 'quiz', completed: false },
];

const Academics: React.FC = () => {
  const upcoming = MOCK_ASSIGNMENTS.filter(a => !a.completed).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  const completed = MOCK_ASSIGNMENTS.filter(a => a.completed);

  return (
    <div className="p-4 space-y-6">
      {/* Canvas Header */}
      <div className="bg-gradient-to-r from-canvas-red to-red-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <PieChart className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Canvas Dashboard</h2>
            <p className="text-red-100 text-sm">Synced: Just now</p>
          </div>
        </div>
        <div className="flex justify-between text-center bg-white/10 rounded-xl p-3">
          <div>
            <div className="text-2xl font-bold">3.8</div>
            <div className="text-xs text-red-100 opacity-80">GPA</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{upcoming.length}</div>
            <div className="text-xs text-red-100 opacity-80">To Do</div>
          </div>
          <div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-red-100 opacity-80">Credits</div>
          </div>
        </div>
      </div>

      {/* Upcoming List */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <Clock size={18} className="mr-2 text-primary-600" /> Upcoming
        </h3>
        <div className="space-y-3">
          {upcoming.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-primary-500 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-full">
                    {item.course}
                  </span>
                  <h4 className="font-bold text-gray-800 mt-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    {item.type === 'exam' ? <AlertCircle size={14} className="mr-1 text-red-500" /> : <FileText size={14} className="mr-1" />}
                    Due: {item.dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {item.type === 'exam' && (
                  <span className="absolute right-0 top-0 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                    EXAM
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed (Collapsed view simulated) */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center opacity-60">
          <CheckCircle2 size={18} className="mr-2" /> Recently Completed
        </h3>
        <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
          {completed.map(item => (
            <div key={item.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex justify-between items-center">
               <div className="flex items-center">
                 <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                 <div>
                    <div className="text-sm font-semibold text-gray-700">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.course}</div>
                 </div>
               </div>
               <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-0.5 rounded-md">Score: 92%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academics;
