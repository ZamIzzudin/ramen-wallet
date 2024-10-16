/** @format */
import { useState } from "react";
import wallet from "../../utility/wallet";

export default function ImportForm({ handleFetch, handleType }) {
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

    const loadedWallet = await wallet.importWallet(seed_phrase);

    wallet.saveWallet(loadedWallet.wallet, password);

    handleFetch();
  }

  return (
    <>
      <div className="centered">
        <h1 className="bold">Import Wallet</h1>
        <h5>Lets Connect to Your Existing Wallet</h5>
      </div>

      <form className="centered w-full mt-5">
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

      <div className="w-full centered mt-1">
        <button className=" w-70" type="button" onClick={() => handleImport()}>
          Import
        </button>
      </div>

      <div className="mt-4 mb-3">
        <p>
          <strong onClick={() => handleType("login")}>Connect</strong> or{" "}
          <strong onClick={() => handleType("register")}>Register</strong>
        </p>
      </div>
    </>
  );
}
