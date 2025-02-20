import React, {createContext} from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext(null);


console.log("Context value:", {
  user: new UserStore(),
  device: new DeviceStore(),
});

// createRoot(document.getElementById("root")).render(
  // <Context.Provider value={{
  //   user: new UserStore(),
  //   device: new DeviceStore(),
  // }}>
  //   <App />
  // </Context.Provider>
// );

ReactDOM.render(
  <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
  }}>
      <App />
  </Context.Provider>,
document.getElementById('root')
);
