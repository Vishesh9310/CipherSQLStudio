import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignmentPage from "./pages/AssignmentPage";
import "./styles/base.scss";
import Assignment from "./pages/Assignment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Assignment/>} />
        <Route path="/assignment/:id" element={<AssignmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
