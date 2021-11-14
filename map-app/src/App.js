import './components/App.css';
import Canvas from './components/Canvas'
import CurrentlyLoaded from "./components/CurrentlyLoaded";
import GettingRoute from "./components/GettingRoute";
import Routes from "./components/Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import React from "react";

function App() {
  return (
      <div className = 'App'>
          <div className="flex_row">

              <div className="flex_column">
                  < CurrentlyLoaded />
                  < GettingRoute />
              </div>
              <div >
                  < Canvas className="canvas"/>
              </div>
              <div>
                  <Routes/>
              </div>

          </div>
          <div className="padding">
              <Button variant="primary" size = "lg" type="submit">
                  Clear Route
              </Button>
          </div>
      </div>
  );
}

export default App;
