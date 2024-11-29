// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IndexPage from './pages';
import AddRule from './pages/Dashboard/add_rule';

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/add-rule" element={<AddRule />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
