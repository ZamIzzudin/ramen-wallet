/** @format */

import { useState } from "react";

import wallet from "../../utility/wallet";

export default function RegisterForm({ handleFetch, handleType }) {
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

    wallet.saveWallet(generateResponse.wallet, passwordForm.password);
    handleFetch();
  }

  return (
    <>
      {generateResponse ? (
        <div className="centered">
          <h5 className="bold">Your Seed Phrase</h5>
          <span>Keep this as a secret, dont let anyone know</span>
          <div className="seed-container mt-1">
            {generateResponse.seed_phrase.split(" ").map((each) => (
              <span>{each}</span>
            ))}
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
          <button
            onClick={() => handleGenerateWallet()}
            className="register-button"
          >
            Generate Wallet
          </button>
        </div>
      )}

      <div className="mt-4 mb-3">
        <p>
          <strong onClick={() => handleType("login")}>Connect</strong> or{" "}
          <strong onClick={() => handleType("import")}>Import</strong>
        </p>
      </div>
    </>
  );
}
