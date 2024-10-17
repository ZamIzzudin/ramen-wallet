/** @format */
import { useState } from "react";

import ImportForm from "./Form/ImportForm";
import RegisterForm from "./Form/RegisterForm";
import LoginForm from "./Form/LoginForm";
import useStore from "../utility/store";

export default function Auth({ handleFetch, handleLogout }) {
  const { is_saved } = useStore();
  const [formLayout, setFormLayout] = useState("register");
  function renderForm() {
    if (is_saved) {
      return (
        <LoginForm handleFetch={handleFetch} handleLogout={handleLogout} />
      );
    }

    if (formLayout === "register") {
      return (
        <RegisterForm handleFetch={handleFetch} handleType={setFormLayout} />
      );
    }

    if (formLayout === "import") {
      return (
        <ImportForm handleFetch={handleFetch} handleType={setFormLayout} />
      );
    }
  }

  return (
    <div className="centered-bottom w-full login">
      {renderForm()}
      <span>
        Any problem? Contact{" "}
        <a href="mailto:azzamizzudinhasan@gmail.com">Ramen Support</a>
      </span>
    </div>
  );
}
