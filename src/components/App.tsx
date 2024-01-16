import { useState } from "react";
import { Pomodoro } from "./Pomodoro";
import { createDb } from "../invokes/db";
import "../stylesheets/App.css";

//create a db to hold the persistent data
createDb("user_data");

function App() {
  return (
    <div className="app">
      <Pomodoro />
    </div>
  );
}

export default App;
