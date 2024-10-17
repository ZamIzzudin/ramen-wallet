/** @format */

import githubIcon from "../assets/githubicon.svg";

import useStore from "../utility/store";

export default function Navbar({ handleLogout }) {
  const { details, network } = useStore();

  if (details.address) {
    return (
      <div className="navbar">
        <span>{network[0]?.name}</span>
        <button type="button" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="navbar">
      <p className="bold">Ramen</p>
      <img src={githubIcon} alt="github icon" height={25} />
    </div>
  );
}
