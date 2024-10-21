/** @format */

import { StringFormat } from "../utility/dateFormatter";
import { addressPrettier } from "../utility/parser";

import {
  RiQrScan2Line,
  RiSendPlaneLine,
  RiSwap2Line,
  RiExchangeDollarLine,
} from "react-icons/ri";

export default function Transactions({ data }) {
  function transactionTypeRender(type) {
    if (type === "send") {
      return <RiSendPlaneLine />;
    }

    if (type === "receive") {
      return <RiQrScan2Line />;
    }

    if (type === "swap") {
      return <RiSwap2Line />;
    }

    if (type === "buy") {
      return <RiExchangeDollarLine />;
    }
  }

  return (
    <section className="w-90 centered mt-2 transaction-section py-2 px-2">
      <div className="centered-left w-full">
        <h4>Recent Transaction</h4>
      </div>
      <div className="transaction-container w-full centered">
        {data.map((item, index) => (
          <div key={index} className="transaction-item">
            <div className="d-flex gap-10">
              <div>
                <span className="transaction-type centered">
                  {transactionTypeRender(item.type)}
                </span>
              </div>
              <div className="centered-left">
                <span className="transaction-address">
                  {addressPrettier(item.to, 10)}
                </span>
                <span className="transaction-date">
                  {StringFormat(item.timestamp.toString())}
                </span>
              </div>
            </div>
            <div className="centered-right">
              <h5 className="bold">{item.amount} RMN</h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
