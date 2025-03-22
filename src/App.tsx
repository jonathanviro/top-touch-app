import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import InvoiceScreen from "./components/InvoiceScreen";
import GameScreen from "./components/GameScreen";
import ScoreScreen from "./components/ScoreScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/invoice" element={<InvoiceScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/score" element={<ScoreScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
