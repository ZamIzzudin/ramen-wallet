/** @format */

import useStore from "../utility/store";

export default function Menu() {
  const { details } = useStore();
  return (
    <div className="centered">
      <span>{details.address}</span>
      <h1>Menu</h1>
    </div>
  );
}
