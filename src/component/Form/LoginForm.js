/** @format */
import { useState } from "react";
import wallet from "../../utility/wallet";
import useStore from "../../utility/store";

import ramen from "../../assets/ramen.gif";

export default function LoginForm({ handleFetch, handleLogout }) {
  const { updateDetails } = useStore();
  const [passwordForm, setPasswordForm] = useState("");

  async function handleLogin() {
    if (!passwordForm) {
      alert("Password is required");
      return;
    }

    const loadedWallet = await wallet.loadWallet(passwordForm);

    updateDetails({
      wallet: loadedWallet.wallet,
      address: loadedWallet.public_key,
    });
    handleFetch();
  }

  return (
    <>
      <div className="centered">
        <img src={ramen} alt="ra-man mascot" width={150} />
        <h1 className="bold mt-1">Welcome Back</h1>
        <h5>Lets Connect to Your Wallet</h5>
      </div>

      <form className="centered w-full mt-3">
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
          <strong onClick={() => handleLogout()}>Switch</strong> to another
          wallet.
        </p>
      </div>
    </>
  );
}
