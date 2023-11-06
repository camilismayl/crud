import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Edit from "./Edit";
import Add from "./Add";
export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* <App></App> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<Add />} />
        <Route path="/update/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}
