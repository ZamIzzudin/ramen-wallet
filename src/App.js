/** @format */
import { useState, useEffect } from "react";
import { DEFAULT_INDEXED } from "./config";
import indexedDB from "./utility/indexedDB";

import Menu from "./component/Menu";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import "./App.css";

function App() {
  const [config, setConfig] = useState({});

  useEffect(() => {
    indexedDB.initDB().then(() => {
      handleFetch();
    });
  }, []);

  function handleLogout() {
    indexedDB.removeData();
    handleFetch();
  }

  async function handleFetch() {
    const data = await indexedDB.getData();
    if (!data) {
      indexedDB.addData(null);
      setConfig(DEFAULT_INDEXED);
    } else {
      setConfig(data);
    }
  }

  return (
    <div className="container centered-start">
      <Navbar config={config} handleLogout={handleLogout} />
      {config?.is_login ? (
        <Menu config={config} />
      ) : (
        <Login handleFetch={handleFetch} />
      )}
    </div>
  );
}

export default App;
