/** @format */

import { useState } from "react";

import wallet from "../../utility/wallet";
import useStore from "../../utility/store";

import bat from "../../assets/bat.gif";

export default function RegisterForm({ handleFetch, handleType }) {
  const { setSavedStatus, updateDetails } = useStore();
  const [generateResponse, setGenerateResponse] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    password: null,
    retype_password: null,
  });

  async function handleGenerateWallet() {
    const response = await wallet.generateWallet();
    setGenerateResponse(response);
  }

  function handleRegister() {
    if (passwordForm.password !== passwordForm.retype_password) {
      alert("Password not match");
      return;
    }
    updateDetails({
      wallet: generateResponse.wallet,
      address: generateResponse.public_key,
    });

    wallet.saveWallet(generateResponse.wallet, passwordForm.password);

    setSavedStatus(true);

    handleFetch();
  }

  function copy2Clipboard() {
    navigator.clipboard.writeText(generateResponse.seed_phrase);
  }

  return (
    <>
      {generateResponse ? (
        <div className="centered">
          <h5 className="bold">Your Seed Phrase</h5>
          <span>Keep this as a secret, dont let anyone know</span>
          <div className="seed-container mt-1" onClick={() => copy2Clipboard()}>
            {generateResponse.seed_phrase.split(" ").map((each) => (
              <span>{each}</span>
            ))}
            <p className="seed-container-tooltip">Copy to Clipboard</p>
          </div>
          <form className="centered w-full mt-1">
            <input
              name="password"
              type="text"
              value={passwordForm.password}
              placeholder="New Password"
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, password: e.target.value })
              }
            />
            <input
              name="retype_password"
              type="text"
              value={passwordForm.retype_password}
              placeholder="Retype Password"
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  retype_password: e.target.value,
                })
              }
            />
          </form>

          <div className="w-full centered mt-1">
            <button
              className=" w-70"
              type="button"
              onClick={() => handleRegister()}
            >
              Register
            </button>
          </div>
        </div>
      ) : (
        <div className="centered generate-wallet-container">
          <img src={bat} alt="ramen mascot" height={150} />
          <h1 className="bold">Get Started</h1>
          <h5>Start your first day in Ramen</h5>
          <button
            onClick={() => handleGenerateWallet()}
            className="register-button mt-5"
          >
            Generate Wallet
          </button>
        </div>
      )}

      <div className="mt-4 mb-3">
        <p>
          <strong onClick={() => handleType("import")}>Import</strong> an
          existing Ramen wallet.
        </p>
      </div>
    </>
  );
}
