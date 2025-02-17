import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConcertList from "./presentation/pages/ConcertList";
import MesBillets from "./presentation/pages/MesBillets";
import Navbar from "./presentation/components/Navbar";

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<ConcertList />} />
        <Route path="/billets" element={<MesBillets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
