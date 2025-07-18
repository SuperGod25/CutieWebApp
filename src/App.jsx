import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Services from './pages/Services';
import Reservations from './pages/Reservations';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/Admin/LoginPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ReservationsPanel from './pages/Admin/ReservationsPanel';
import NewsletterPanel from './pages/Admin/NewsletterPanel';
import ProtectedRoute from '@/components/ProtectedRoute';
import ContentManager from './pages/Admin/ContentManager';import Unauthorized from '@/pages/Unauthorized';
import SignUp from '@/pages/SignUp';






function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/*<Route path="/signup" element={<SignUp />} />*/}
            <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
            />
            <Route
            path="/dashboard/reservations"
            element={
              <ProtectedRoute>
                  <ReservationsPanel />
              </ProtectedRoute>
                }
            />
            <Route
  path="/dashboard/newsletter"
  element={
    <ProtectedRoute>
      <NewsletterPanel />
    </ProtectedRoute>
  }
/>
            <Route
  path="/dashboard/manage"
  element={
    <ProtectedRoute>
      <ContentManager />
    </ProtectedRoute>
  }
/>


          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
