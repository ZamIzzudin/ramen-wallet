/** @format */
import { useState } from "react";

import ImportForm from "./Form/ImportForm";

import RegisterForm from "./Form/RegisterForm";
import LoginForm from "./Form/LoginForm";

export default function Login({ handleFetch }) {
  const [formLayout, setFormLayout] = useState("login");

  function renderForm() {
    if (formLayout === "login") {
      return <LoginForm handleFetch={handleFetch} handleType={setFormLayout} />;
    } else if (formLayout === "register") {
      return (
        <RegisterForm handleFetch={handleFetch} handleType={setFormLayout} />
      );
    } else if (formLayout === "import") {
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
