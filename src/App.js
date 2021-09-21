import React from "react";
import { Route, Switch } from "react-router-dom";

import TopAppBar from "./components/TopAppBar";

import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  return (
    <div>
      <TopAppBar />
      <div className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
