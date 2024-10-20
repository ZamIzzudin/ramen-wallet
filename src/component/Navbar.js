/** @format */

import { Tooltip } from "react-tooltip";

import DropDown from "./DropDown";
import useStore from "../utility/store";
import { addressPrettier } from "../utility/parser";

// import { TbBat } from "react-icons/tb";
import { MdOutlineRamenDining } from "react-icons/md";
import { IoIosWallet } from "react-icons/io";

export default function Navbar() {
  const { details, network } = useStore();

  function copy2Clipboard() {
    navigator.clipboard.writeText(details.address);
  }

  if (details.address) {
    return (
      <div className="navbar">
        <DropDown data={network} />
        <span className="wallet-address" onClick={() => copy2Clipboard()}>
          <IoIosWallet />
          {addressPrettier(details.address)}
        </span>

        <Tooltip anchorSelect=".wallet-address" place="bottom">
          Click to copy
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="navbar">
      <p className="bold">Ramen</p>
      <div className="logo">
        <MdOutlineRamenDining />
      </div>
    </div>
  );
}
