import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import AppContext from "./context";
import "./scss/app.scss";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
