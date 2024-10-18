/** @format */
import { useState } from "react";

import wallet from "../../utility/wallet";
import useStore from "../../utility/store";

import ramen from "../../assets/ramen.gif";

export default function ImportForm({ handleFetch, handleType }) {
  const { setSavedStatus, updateDetails } = useStore();

  const [importForm, setImportForm] = useState({
    seed_phrase: null,
    password: null,
    retype_password: null,
  });

  async function handleImport() {
    if (importForm.password !== importForm.retype_password) {
      alert("Password not match");
      return;
    }
    const { seed_phrase, password } = importForm;

    const response = await wallet.importWallet(seed_phrase);

    updateDetails({ wallet: response.wallet, address: response.public_key });

    wallet.saveWallet(response.wallet, password);

    setSavedStatus(true);

    handleFetch();
  }

  return (
    <>
      <div className="centered">
        <img src={ramen} alt="ramen mascot" height={100} />
        <h1 className="bold mt-1">Import Wallet</h1>
        <h5>Lets Connect to Your Existing Wallet</h5>
      </div>

      <form className="centered w-full mt-3">
        <input
          name="seed_phrase"
          type="text"
          value={importForm.seed_phrase}
          placeholder="Enter Your Seed Phrase"
          onChange={(e) =>
            setImportForm({
              ...importForm,
              seed_phrase: e.target.value,
            })
          }
        />
        <input
          name="password"
          type="text"
          value={importForm.password}
          placeholder="New Password"
          onChange={(e) =>
            setImportForm({ ...importForm, password: e.target.value })
          }
        />
        <input
          name="retype_password"
          type="text"
          value={importForm.retype_password}
          placeholder="Retype Password"
          onChange={(e) =>
            setImportForm({
              ...importForm,
              retype_password: e.target.value,
            })
          }
        />
      </form>

      <div className="w-full centered mt-2">
        <button className=" w-70" type="button" onClick={() => handleImport()}>
          Import
        </button>
      </div>

      <div className="mt-3 mb-3">
        <p>
          <strong onClick={() => handleType("register")}>Generate</strong> a new
          Ramen wallet.
        </p>
      </div>
    </>
  );
}
