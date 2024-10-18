/** @format */
import useStore from "../utility/store";
import { addressPrettier } from "../utility/parser";
import {
  RiQrScan2Line,
  RiSendPlaneLine,
  RiSwap2Line,
  RiExchangeDollarLine,
} from "react-icons/ri";

export default function Menu() {
  const { details } = useStore();

  const dummy = [
    {
      to: "0404ffed24840cb0968d29f08915d7dd03a82ef5751d488c36b9282c23c02286db3dfdd1fda02a30443aa80ed7930b2592eaac33a584aae0a16b1a7c066782604b",
      value: 5,
      type: "send",
      date: "2021-08-01",
    },
    {
      to: "0404ffed24840cb0968d29f08915d7dd03a82ef5751d488c36b9282c23c02286db3dfdd1fda02a30443aa80ed7930b2592eaac33a584aae0a16b1a7c066782604b",
      value: 5,
      type: "receive",
      date: "2021-08-01",
    },
    {
      to: "0404ffed24840cb0968d29f08915d7dd03a82ef5751d488c36b9282c23c02286db3dfdd1fda02a30443aa80ed7930b2592eaac33a584aae0a16b1a7c066782604b",
      value: 5,
      type: "swap",
      date: "2021-08-01",
    },
    {
      to: "0404ffed24840cb0968d29f08915d7dd03a82ef5751d488c36b9282c23c02286db3dfdd1fda02a30443aa80ed7930b2592eaac33a584aae0a16b1a7c066782604b",
      value: 5,
      type: "buy",
      date: "2021-08-01",
    },
  ];

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
    <div className="centered mt-2 mb-2">
      <section className="w-full centered">
        <h1 className="account bold">{details.balance.toFixed(2)} RMN</h1>
        <h5 className="faded">${(details.balance * 0.1).toFixed(2)} USD</h5>
      </section>

      <section className="menu-action w-full mt-2">
        <div className="centered">
          <span className="menu-action-item centered">
            <RiSendPlaneLine />
          </span>
          <span>Send</span>
        </div>
        <div className="centered">
          <span className="menu-action-item centered">
            <RiQrScan2Line />
          </span>
          <span>Receive</span>
        </div>
        <div className="centered">
          <span className="menu-action-item centered">
            <RiSwap2Line />
          </span>
          <span>Swap</span>
        </div>
        <div className="centered">
          <span className="menu-action-item centered">
            <RiExchangeDollarLine />
          </span>
          <span>Buy</span>
        </div>
      </section>

      <section className="w-90 centered mt-2 transaction-section py-2 px-2">
        <div className="centered-left w-full">
          <h4>Recent Transaction</h4>
        </div>
        <div className="transaction-container w-full centered">
          {dummy.map((item, index) => (
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
                  <span className="transaction-date">{item.date}</span>
                </div>
              </div>
              <div className="centered-right">
                <h5 className="bold">{item.value} RMN</h5>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
