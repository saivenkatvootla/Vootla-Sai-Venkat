import React, { useState } from 'react';
import { MealOption, Booking } from '../types';
import { Calendar, Check, Utensils, Info } from 'lucide-react';

const MOCK_MEALS: MealOption[] = [
  { id: '1', name: 'Avocado Toast & Eggs', type: 'breakfast', calories: 450, tags: ['Vegetarian', 'High Protein'], image: 'https://picsum.photos/200/200?random=1' },
  { id: '2', name: 'Berry Smoothie Bowl', type: 'breakfast', calories: 320, tags: ['Vegan', 'GF'], image: 'https://picsum.photos/200/200?random=2' },
  { id: '3', name: 'Grilled Chicken Salad', type: 'lunch', calories: 550, tags: ['Healthy', 'Low Carb'], image: 'https://picsum.photos/200/200?random=3' },
  { id: '4', name: 'Pesto Pasta', type: 'lunch', calories: 600, tags: ['Contains Nuts'], image: 'https://picsum.photos/200/200?random=4' },
  { id: '5', name: 'Salmon & Quinoa', type: 'dinner', calories: 700, tags: ['Omega-3'], image: 'https://picsum.photos/200/200?random=5' },
  { id: '6', name: 'Vegan Burger', type: 'dinner', calories: 580, tags: ['Plant Based'], image: 'https://picsum.photos/200/200?random=6' },
];

const MealBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedType, setSelectedType] = useState<'breakfast' | 'lunch' | 'dinner'>('lunch');
  const [bookings, setBookings] = useState<Booking[]>([]);

  const filteredMeals = MOCK_MEALS.filter(m => m.type === selectedType);

  const handleBook = (meal: MealOption) => {
    const isBooked = bookings.find(b => b.date === selectedDate && b.mealId === meal.id);
    if (isBooked) {
      setBookings(prev => prev.filter(b => b.id !== isBooked.id));
    } else {
      setBookings(prev => [...prev, { id: Math.random().toString(), date: selectedDate, mealId: meal.id }]);
    }
  };

  const isMealBooked = (mealId: string) => bookings.some(b => b.date === selectedDate && b.mealId === mealId);

  // Helper for date tabs
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="p-4 space-y-6">
      {/* Date Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {dates.map(date => {
          const isSelected = date === selectedDate;
          const dateObj = new Date(date);
          const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
          const num = dateObj.getDate();
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center min-w-[60px] p-2 rounded-xl border transition-all ${
                isSelected ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              <span className="text-xs font-medium opacity-80">{day}</span>
              <span className="text-lg font-bold">{num}</span>
            </button>
          );
        })}
      </div>

      {/* Meal Type Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-lg">
        {['breakfast', 'lunch', 'dinner'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type as any)}
            className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all ${
              selectedType === type ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMeals.map(meal => {
          const booked = isMealBooked(meal.id);
          return (
            <div key={meal.id} className={`flex bg-white p-3 rounded-2xl shadow-sm border ${booked ? 'border-green-400 bg-green-50' : 'border-gray-100'}`}>
              <img src={meal.image} alt={meal.name} className="w-24 h-24 rounded-xl object-cover" />
              <div className="ml-4 flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-gray-800">{meal.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {meal.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-semibold text-gray-400 flex items-center">
                    <Info size={12} className="mr-1" /> {meal.calories} kcal
                  </span>
                  <button
                    onClick={() => handleBook(meal)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center ${
                      booked 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {booked ? (
                      <>
                        <Check size={14} className="mr-1.5" /> Booked
                      </>
                    ) : (
                      <>
                        <Utensils size={14} className="mr-1.5" /> Reserve
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealBooking;
