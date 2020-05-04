import React, {Suspense} from 'react';
import logo from './logo.svg';
import {Provider} from 'react-redux';
import Main from './Main';
import ConfigureStore from './redux/configureStore';
import { Canvas } from "react-three-fiber";
import Cubes from "./components/PlanetDisplay";
import Lights from "./components/Lights";
import Environment from "./components/Enviroment";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const store = ConfigureStore();

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
    // <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}>
    //   <div style={{height:"100%"}}>
    //     {/* <Canvas camera={{ fov: 70, position: [0, 0, 8] }}>       */}
    //     {/* <Canvas camera={{ fov: 90 }}>       */}
    //       <Canvas 
    //         camera={{fov:25,
    //           aspect: window.innerWidth / window.innerHeight,
    //           near: 0.1,
    //           far: 1000
    //         }}>
    //         <Suspense fallback={<group />}>
    //           <Cubes />
    //           <Lights />
    //           <Environment />
    //         </Suspense> 
    //       </Canvas>
    //   </div>
    //   {/* <div>
    //       Hello 
    //   </div> */}
    // </div>
    <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}>
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
