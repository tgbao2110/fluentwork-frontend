import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TestPage from './pages/placementTest/Test';
import TestInfoPage from './pages/placementTest/TestInfo';
import Results from './pages/Results';
import Answer from './pages/placementTest/Answer';
import ForgotPassword from './pages/auth/ForgotPassword';
import Flashcards from './pages/flashcards/Flashcards';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/testinfo" element={<TestInfoPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;