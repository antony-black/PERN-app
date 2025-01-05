import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Context } from "./main";
import { checkAuth } from "./http/userAPI";

  const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().then(data => {
      user.setUser({data});
      user.setIsAuth(true);
    }).finally(() => setLoading(false));
  },[]);

  if (loading) {
    return <Spinner animation={"grow"}/>
  }
  

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
