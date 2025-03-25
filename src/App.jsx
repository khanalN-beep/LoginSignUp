import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/loginsignup";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import Verify from "./components/verify";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;