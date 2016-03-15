// include styles into bundle.js
// so you don't need it to add them in index.html
import React from "react";
import ReactDOM from "react-dom";
import Home from "./views/home";

// import some modules from other files

const App = (props) => {
  return(
    <Home />
  )
}

const container = document.getElementById('container');

ReactDOM.render(
  <App />,
  container
);
