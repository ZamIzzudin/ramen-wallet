/** @format */
/* global chrome */
import { useEffect, useState } from "react";

import api from "../utility/api";
import useStore from "../utility/store";
import { StringFormat } from "../utility/dateFormatter";

import { addressPrettier } from "../utility/parser";
import {
  RiQrScan2Line,
  RiSendPlaneLine,
  RiSwap2Line,
  RiExchangeDollarLine,
} from "react-icons/ri";

export default function Menu() {
  const { details, balance, transaction, updateBalance, updateTransaction } =
    useStore();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
    getBalance();

    chrome.storage.local.get("pageData", (result) => {
      if (result) {
        console.log(result);
      } else {
        console.log("No Data");
      }
    });
  }, []);

  async function getTransactions() {
    const response = await api.getTransactions(details.address);
    setTransactions(response);
  }
  async function getBalance() {
    const response = await api.getBalance(details.address);
    updateBalance(response);
  }

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

  function handleCallback() {
    console.log("tes");
    chrome.runtime.sendMessage({
      type: "ramen-response",
      data: "Hello World",
    });
  }

  return (
    <div className="centered mt-2 mb-2">
      <section className="w-full centered">
        <h1 className="account bold">{balance.toFixed(2)} RMN</h1>
        <h5 className="faded">${(balance * 0.01).toFixed(2)} USD</h5>
      </section>

      <section className="menu-action w-full mt-2">
        <div className="centered" onClick={() => updateTransaction({})}>
          <span className="menu-action-item centered">
            <RiSendPlaneLine />
          </span>
          <span>Send</span>
        </div>
        <div className="centered" onClick={() => updateTransaction(null)}>
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
        <div className="centered" onClick={() => handleCallback()}>
          <span className="menu-action-item centered">
            <RiExchangeDollarLine />
          </span>
          <span>Buy</span>
        </div>
      </section>

      {transaction ? (
        <div>
          <span>Transaction Detected</span>
        </div>
      ) : (
        <section className="w-90 centered mt-2 transaction-section py-2 px-2">
          <div className="centered-left w-full">
            <h4>Recent Transaction</h4>
          </div>
          <div className="transaction-container w-full centered">
            {transactions.map((item, index) => (
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
      )}
    </div>
  );
}
