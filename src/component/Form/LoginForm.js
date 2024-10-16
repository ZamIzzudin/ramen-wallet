/** @format */
import { useState } from "react";
import wallet from "../../utility/wallet";

import bat from "../../assets/bat.gif";

export default function LoginForm({ handleFetch, handleType }) {
  const [passwordForm, setPasswordForm] = useState(null);

  async function handleLogin() {
    if (!passwordForm) {
      alert("Password is required");
      return;
    }

    const loadedWallet = await wallet.loadWallet(passwordForm);
    handleFetch();

    console.log(loadedWallet);
  }

  return (
    <>
      <div className="centered">
        <img src={bat} alt="ra-man mascot" width={150} />
        <h1 className="bold">Get Started</h1>
        <h5>Lets Connect to Your Wallet</h5>
      </div>

      <form className="centered w-full mt-5">
        <input
          name="password"
          type="password"
          value={passwordForm}
          placeholder="Enter Your Password"
          onChange={(e) => setPasswordForm(e.target.value)}
        />
      </form>

      <div className="w-full centered mt-1">
        <button className=" w-70" type="button" onClick={() => handleLogin()}>
          Connect
        </button>
      </div>

      <div className="mt-4 mb-3">
        <p>
          <strong onClick={() => handleType("import")}>Import</strong> or{" "}
          <strong onClick={() => handleType("register")}>Register</strong>
        </p>
      </div>
    </>
  );
}
