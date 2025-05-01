import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TestPage from './pages/testPages/Test';
import TestInfoPage from './pages/testPages/TestInfo';
import Results from './pages/Results';
import Answer from './pages/testPages/Answer';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/testinfo" element={<TestInfoPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;