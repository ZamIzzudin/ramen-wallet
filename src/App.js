/** @format */
import { useEffect } from "react";
import indexedDB from "./utility/indexedDB";

import useStore from "./utility/store";

import Menu from "./component/Menu";
import Auth from "./component/Auth";
import Navbar from "./component/Navbar";
import "./App.css";

function App() {
  const { setNetwork, setSavedStatus, updateDetails, details } = useStore();

  useEffect(() => {
    indexedDB.initDB().then(() => {
      handleFetch();
    });
  }, []);

  function handleLogout() {
    indexedDB.removeData();
    setSavedStatus(false);
    updateDetails({ wallet: null, public_key: null, balance: 0 });
    handleFetch();
  }

  async function handleFetch() {
    const data = await indexedDB.getData();
    if (!data) {
      indexedDB.addData(null);
      return;
    }

    if (!data.token) {
      setSavedStatus(false);
      return;
    }

    setNetwork(data.network);
    setSavedStatus(true);
  }

  return (
    <div className="container centered-start">
      <Navbar handleLogout={handleLogout} />
      {details.address ? (
        <Menu />
      ) : (
        <Auth handleFetch={handleFetch} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
