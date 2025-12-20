import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Game, Menu, Setup } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
