import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuScreen from "./components/MenuScreen";
import HomeScreen from "./components/HomeScreen";
import InvoiceScreen from "./components/InvoiceScreen";
import GameScreen from "./components/GameScreen";
import ConfigScreen from "./components/ConfigScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuScreen />} />
        <Route path="/home" element={<HomeScreen />}></Route>
        <Route path="/invoice" element={<InvoiceScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/config" element={<ConfigScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
