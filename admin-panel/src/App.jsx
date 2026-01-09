import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PortfolioManagement from './pages/PortfolioManagement';
import ServicesManagement from './pages/ServicesManagement';
import CategoriesManagement from './pages/CategoriesManagement';
import ResumeManagement from './pages/ResumeManagement';
import ContactManagement from './pages/ContactManagement';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<PortfolioManagement />} />
          <Route path="services" element={<ServicesManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="resume" element={<ResumeManagement />} />
          <Route path="contact" element={<ContactManagement />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

