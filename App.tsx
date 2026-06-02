import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Community } from './components/Community';
import { ProjectDetails } from './components/ProjectDetails';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { Login } from './components/Login';
import { UserDashboard } from './components/UserDashboard';
import { ContactUs } from './components/ContactUs';
import { Redeem } from './components/Redeem';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="animate-spin w-8 h-8 text-black" />
  </div>
);

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Route */}
            <Route path="/admin" element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            } />

            {/* Protected User Dashboard - Standalone Layout */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <UserDashboard />
              </RequireAuth>
            } />

            {/* Public Routes with Header/Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/community" element={<Community />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/redeem" element={<Redeem />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;