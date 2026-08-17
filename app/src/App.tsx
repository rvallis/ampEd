import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ModulePage from "./pages/ModulePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:branch/:slug" element={<ModulePage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
