import React from 'react';
import {Provider} from 'react-redux';
import Main from './Main';
import ConfigureStore from './redux/configureStore';
import './App.css';


const store = ConfigureStore();

function App() {
  return (
    <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}>
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
