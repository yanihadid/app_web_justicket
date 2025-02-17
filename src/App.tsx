import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConcertList from "./presentation/pages/ConcertList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConcertList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
