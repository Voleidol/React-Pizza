import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NotFoundBlock from "./components/NotFoundBlock";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import AppContext from "./context";
import { useSelector, useDispatch } from "react-redux";
import "./scss/app.scss";
import { decrement, increment } from "./redux/slices/filterSlice";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <div className="wrapper">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      {/* <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </AppContext.Provider> */}
    </div>
  );
}

export default App;
