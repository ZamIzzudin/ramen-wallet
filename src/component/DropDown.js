/** @format */

import { useState } from "react";

// import { TbBat } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineRamenDining } from "react-icons/md";

export default function DropDown({ data }) {
  const [isShown, setShown] = useState(false);

  return (
    <>
      <div className="drop-down">
        <span
          className={`dropdown-toogle ${!isShown && "drop-down-hide"}`}
          onClick={() => setShown(!isShown)}
        >
          Network <FaChevronDown />
        </span>
        <div className="drop-down-container">
          {data.map((item, index) => (
            <span className="drop-down-item" key={index}>
              <MdOutlineRamenDining />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
