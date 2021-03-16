import React from "react";

import {
  Switch,
  Route
} from "react-router-dom";
import Main from "./Pages/Main"
import Item from "./Pages/Item"
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/item/:id" exact component={Item} />
      </Switch>
    </div>
  );
}

export default App;
