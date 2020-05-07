import React from 'react';
import {Provider} from 'react-redux';
import Main from './Main';
import ConfigureStore from './redux/configureStore';
import './App.css';
import {loadState, saveState} from './redux/localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = ConfigureStore(persistedState);

store.subscribe(throttle(
  () => {
      saveState(store.getState());
}, 1000));

function App() {
  return (
    <div style={{height:"100%", width: "100%", backgroundColor:"blue"}} >
      <div style={{height:"100%", maxWidth:"700px", width: "90%", borderWidth:"2", borderColor:"black", margin:"auto", backgroundColor:"white", padding: "10px"}}>
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    </div>
  );
}

export default App;
