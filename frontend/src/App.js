import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationsProvider } from './context/NotificationsContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthSuccess from './pages/AuthSuccess';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HostPage from './pages/HostPage';
import ExplorePage from './pages/ExplorePage';
import NotificationsPage from './pages/NotificationsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BottomNavBar from './components/layout/BottomNavBar';
import LeftSideNav from './components/layout/LeftSideNav';
import { useAuth } from './context/AuthContext';
import './styles/App.css';

// Wrapper component to conditionally render LeftSideNav based on authentication
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Header />
      <div className="flex flex-1 pt-16 md:pt-20"> 
        {isAuthenticated && <LeftSideNav />} 
        {/* Main content area: Add left margin if LeftSideNav is present */}
        <main className={`flex-1 p-2 md:p-4 pb-16 md:pb-0 ${isAuthenticated ? 'md:ml-64' : ''}`}> 
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/onlyforyou" replace /> : <HomePage />
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            
            {/* Legacy route redirects */}
            <Route path="/dashboard" element={<ProtectedRoute><Navigate to="/onlyforyou" replace /></ProtectedRoute>} />
            <Route path="/tables" element={<ProtectedRoute><Navigate to="/onlyforyou" replace /></ProtectedRoute>} />
            <Route path="/circles" element={<ProtectedRoute><Navigate to="/explore" replace /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Navigate to="/message" replace /></ProtectedRoute>} />
            
            {/* Main navigation routes */}
            <Route 
              path="/onlyforyou" 
              element={
                <ProtectedRoute>
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Only For You</h1>
                    <p>Personalized content curated just for you.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/explore" 
              element={
                <ProtectedRoute>
                  <ExplorePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/message" 
              element={
                <ProtectedRoute>
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4">Messages</h1>
                    <p>Your conversations and chats.</p>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/host" 
              element={
                <ProtectedRoute>
                  <HostPage />
                </ProtectedRoute>
              } 
            />
            
            {/* User management routes */}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
      <BottomNavBar />
      {!isAuthenticated && <Footer />}
    </>
  );
};

// Following Single Responsibility Principle - App component only handles setup
const App = () => {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <AppContent />
      </NotificationsProvider>
    </AuthProvider>
  );
};

export default App;
