import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IndexPage from './pages'; // Страница без данных
import IndexRulesPage from './pages/index_rules'; // Страница с правилами
import AddRule from './pages/add_rule';

function App() {
  const location = useLocation();
  const [hasRules, setHasRules] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const response = await import('@/utils/storage.json', { assert: { type: 'json' } });
        const data = response.default;

        const user = data?.user || null;
        const rules = user?.rules || [];
        setHasRules(rules.length > 0); // Проверяем, есть ли правила
      } catch (error) {
        console.warn('Error reading or parsing storage.json:', error);
        setHasRules(false); // Если ошибка, считаем, что данных нет
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    checkStorage();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#1E1E1E] h-screen flex items-center justify-center text-[#F5F5F5]">
        <p className="text-lg font-light">Loading...</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          path="/"
          element={hasRules ? <IndexRulesPage key="rules" /> : <IndexPage key="home" />}
        />
        <Route
          path="/add-rule"
          element={<AddRule key="add-rule" />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
