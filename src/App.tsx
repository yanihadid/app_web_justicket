import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConcertList from "./presentation/pages/ConcertList";
import MesBillets from "./presentation/pages/MesBillets";
import Navbar from "./presentation/components/Navbar";
import HomePage from "./presentation/pages/HomePage";
import SignUp from "./presentation/pages/SignUpPage";
import Login from "./presentation/pages/LoginPage";
import Footer from "./presentation/components/Footer";

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/concerts" element={<ConcertList />} />
          <Route path="/billets" element={<MesBillets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
