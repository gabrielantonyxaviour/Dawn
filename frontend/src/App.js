import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
function App() {
  return (
    <div class="outer">
      <div class="middle">
        <div class="inner">
          <Header />
        </div>
      </div>
    </div>
  );
}

export default App;
