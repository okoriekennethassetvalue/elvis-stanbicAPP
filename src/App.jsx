import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pin from "./pages/Pin";
import Otp from "./pages/Otp";
import SecondOtp from "./pages/SecondOtp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pin" element={<Pin />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/second-otp" element={<SecondOtp />} />
    </Routes>
  );
}

export default App;
