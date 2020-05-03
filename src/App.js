import React, {Suspense} from 'react';
import logo from './logo.svg';
import { Canvas } from "react-three-fiber";
import Cubes from "./components/PlanetDisplay";
import Lights from "./components/Lights";
import Environment from "./components/Enviroment";
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}>
      <div style={{height:"50%"}}>
          <Canvas>
            <Suspense fallback={<group />}>
              <Cubes />
              <Lights />
              <Environment />
            </Suspense> 
          </Canvas>
      </div>
      <div>
          Hello 
      </div>
    </div>
  );
}

export default App;
