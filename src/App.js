import React from 'react';
import {Provider} from 'react-redux';
import Main from './Main';
import ConfigureStore from './redux/configureStore';
import './App.css';
import {loadState, saveState} from './redux/localStorage';
import throttle from 'lodash/throttle';
import coverbg from './assets/coverbg.jpg'

const persistedState = loadState();

const store = ConfigureStore(persistedState);

store.subscribe(throttle(
  () => {
      saveState(store.getState());
}, 1000));

function App() {
  return (
    <div style={{height:"100%", width: "100%", backgroundColor:"blue", backgroundImage: 'url(' + coverbg + ')'}} >
      <div style={{height:"95%", maxWidth:"700px", width: "95%", borderWidth:"2", borderColor:"black", margin:"auto", backgroundColor:'rgba(0, 0, 0, 0.95)', padding: "10px"}}>
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    </div>
  );
}

export default App;
