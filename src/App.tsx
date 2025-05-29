import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./utils/UserContext";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TestPage from "./pages/placementTest/Test";
import TestInfoPage from "./pages/placementTest/TestInfo";
import Results from "./pages/Results";
import Answer from "./pages/placementTest/Answer";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import Flashcards from "./pages/flashcards/Flashcards";
import Dashboard from "./pages/dashboard/Dashboard";
import Topics from "./pages/lesson/Topics";
import Home from "./pages/home/Home";
import Lesson from "./pages/lesson/Lesson";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar /> {/* Navbar now has access to user context globally */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test-info" element={<TestInfoPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/lesson" element={<Topics />} />
          <Route path="/lesson/:name" element={<Lesson />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
