import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Game, Menu } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
