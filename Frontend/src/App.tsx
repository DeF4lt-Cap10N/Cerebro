import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { SharePage } from "./Pages/SharePage";
import  LandingPage  from "./Pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareLink" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
