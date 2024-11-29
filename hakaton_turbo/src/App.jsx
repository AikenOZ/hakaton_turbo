// App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IndexPage from './pages';
import AddRule from './pages/Dashboard/add_rule';

function App() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          <AnimatePresence mode="wait">
            <IndexPage key="home" />
          </AnimatePresence>
        }
      />
      <Route
        path="/add-rule"
        element={
          <AnimatePresence mode="wait">
            <AddRule key="add-rule" />
          </AnimatePresence>
        }
      />
    </Routes>
  );
}

export default App;
