import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MealBooking from './components/MealBooking';
import Academics from './components/Academics';
import CampusMap from './components/CampusMap';
import Support from './components/Support';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard setView={setCurrentView} />;
      case View.MEALS:
        return <MealBooking />;
      case View.ACADEMICS:
        return <Academics />;
      case View.MAP:
        return <CampusMap />;
      case View.SUPPORT:
        return <Support />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
