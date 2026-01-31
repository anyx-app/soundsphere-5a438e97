import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

// Placeholder components for routes that don't have pages yet
const SearchPage = () => <div className="text-white text-2xl font-bold">Search (Coming Soon)</div>;
const LibraryPage = () => <div className="text-white text-2xl font-bold">Your Library (Coming Soon)</div>;

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Route>
    </Routes>
  );
}
