import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { ScrollToElementProvider } from './context/ScrollToElementContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthSuccess from './pages/AuthSuccess';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HostPage from './pages/HostPage';
import ExplorePage from './pages/ExplorePage';
import NotificationsPage from './pages/NotificationsPage';
import OnlyForYouPage from './pages/OnlyForYouPage';
import EventDetailPage from './pages/EventDetailPage';
import UserProfilePage from './pages/profile/UserProfilePage';
import AboutPage from './pages/info/AboutPage';
import FeaturesPage from './pages/info/FeaturesPage';
import CreatorsPage from './pages/info/CreatorsPage';
import BusinessPage from './pages/info/BusinessPage';
import GuidelinesPage from './pages/info/GuidelinesPage';
import FAQPage from './pages/info/FAQPage';
import ContactPage from './pages/info/ContactPage';
import PoliciesPage from './pages/info/PoliciesPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ResponsiveNavBar from './components/layout/ResponsiveNavBar';
import { useAuth } from './context/AuthContext';
import './styles/App.css';

// Wrapper component to conditionally render content based on authentication
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Header />
      <div className="flex flex-1 pt-16 md:pt-20"> 
        {/* Main content area: Add left margin if authenticated (for desktop side nav) */}
        <main className={`flex-1 p-2 md:p-4 pb-16 md:pb-0 ${isAuthenticated ? 'md:ml-64' : ''}`}> 
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/onlyforyou" replace /> : <HomePage />
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            
            {/* Information pages - these do not require authentication */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/creators" element={<CreatorsPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            
            {/* Main navigation routes */}
            <Route 
              path="/onlyforyou" 
              element={
                <ProtectedRoute>
                  <OnlyForYouPage />
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
            
            {/* Event detail routes */}
            <Route 
              path="/events/:id" 
              element={
                <ProtectedRoute>
                  <EventDetailPage type="events" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tables/:id" 
              element={
                <ProtectedRoute>
                  <EventDetailPage type="tables" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/circles/:id" 
              element={
                <ProtectedRoute>
                  <EventDetailPage type="circles" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/:type/:id" 
              element={
                <ProtectedRoute>
                  <EventDetailPage />
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
            <Route path="/profile/:id" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
      <ResponsiveNavBar />
      {!isAuthenticated && <Footer />}
    </>
  );
};

// Following Single Responsibility Principle - App component only handles setup
const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <NotificationsProvider>
          <ScrollToElementProvider>
            <AppContent />
          </ScrollToElementProvider>
        </NotificationsProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
