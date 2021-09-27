import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./contexts/AuthContext";
import TopAppBar from "./components/TopAppBar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <AuthProvider>
        <TopAppBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
