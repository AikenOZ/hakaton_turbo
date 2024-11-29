import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages';
import AddRule from './pages/Dashboard/add_rule';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/add-rule" element={<AddRule />} />
    </Routes>
  );
}

export default App;