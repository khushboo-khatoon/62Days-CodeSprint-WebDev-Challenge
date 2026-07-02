import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TradingProvider, useTrading } from './context/TradingContext';
import LandingPage from './components/Landing/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Markets from './components/Markets/Markets';
import Portfolio from './components/Portfolio/Portfolio';
import Orders from './components/Orders/Orders';
import Watchlist from './components/Watchlist/Watchlist';
import Analytics from './components/Analytics/Analytics';
import AdminPanel from './components/Admin/AdminPanel';
import StudyPlannerPage from './pages/StudyPlannerPage';
import { StudyProvider } from './context/StudyContext';
import TeamFormationPage from './pages/TeamFormationPage';
import { TeamProvider } from './context/TeamContext';

import TradingModal from './components/Trading/TradingModal';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { selectedStock, setSelectedStock } = useTrading();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showLanding, setShowLanding] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show landing page if user is not logged in and showLanding is true
  if (!user && showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm 
        onToggleMode={() => setAuthMode('signup')} 
        onBackToLanding={() => setShowLanding(true)}
      />
    ) : (
      <SignupForm 
        onToggleMode={() => setAuthMode('login')} 
        onBackToLanding={() => setShowLanding(true)}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'markets':
        return <Markets />;
      case 'portfolio':
        return <Portfolio />;
      case 'orders':
        return <Orders />;
      case 'watchlist':
        return <Watchlist />;
      case 'analytics':
        return <Analytics />;
      case 'admin':
        return user.role === 'admin' ? <AdminPanel /> : <Dashboard />;
      case 'team-formation':
        return <TeamFormationPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
      />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        
        <main className="flex-1 lg:ml-64">
          {renderPage()}
        </main>
      </div>

      {/* Trading Modal */}
      {selectedStock && (
        <TradingModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TradingProvider>
        <StudyProvider>
          <TeamProvider>
            <AppContent />
          </TeamProvider>
        </StudyProvider>
      </TradingProvider>
    </AuthProvider>
  );
}

export default App;