/** @format */

import githubIcon from "../assets/githubicon.svg";

export default function Navbar({ config, handleLogout }) {
  if (config.is_login) {
    return (
      <div className="navbar">
        <span>{config.type}</span>
        <button type="button" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="navbar">
      <span>Ramen</span>
      <img src={githubIcon} alt="github icon" height={25} />
    </div>
  );
}
