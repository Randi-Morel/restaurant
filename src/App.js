import React from "react";
import { Route, Routes } from "react-router";
import Orders from "./views/Orders";
import Menu from "./views/Menu";
import NewSaucer from "./views/NewSaucer";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="md:flex min-h-screen">
      <Sidebar />
      <div className="md:w-3/5 xl:w-4/5 p-6">
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/new-saucer" element={<NewSaucer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
