import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ModulePage from "./pages/ModulePage";
import { ZoomTransitionProvider } from "./transition/ZoomTransition";

export default function App() {
  return (
    <BrowserRouter>
      <ZoomTransitionProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:branch/:slug" element={<ModulePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </ZoomTransitionProvider>
    </BrowserRouter>
  );
}
