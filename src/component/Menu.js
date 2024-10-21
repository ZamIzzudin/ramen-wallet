/** @format */
/* global chrome */
import { useEffect, useState } from "react";
import Transactions from "./Transactions";
import TransactionForm from "./Form/Transaction";

import api from "../utility/api";
import useStore from "../utility/store";

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
    chrome.storage.local.get("pageData", (result) => {
      if (result.pageData) {
        updateTransaction({
          ...result.pageData,
          date: new Date().toISOString(),
        });
      } else {
        console.log("No Data");
      }
    });
    // updateTransaction({
    //   type: "send",
    //   to: "ksdjhoiaYE89q93yeuashdjkabdnsbadkqyiuyqiuwehjhdkjyw92yqwuehakjhasdjhiuadghkjashdaj",
    //   amount: 500,
    //   date: new Date().toISOString(),
    // });
  }, []);

  useEffect(() => {
    getTransactions();
    getBalance();
  }, [transaction]);

  async function getTransactions() {
    const response = await api.getTransactions(details.address);
    setTransactions(response);
  }
  async function getBalance() {
    const response = await api.getBalance(details.address);
    updateBalance(response);
  }

  return (
    <div className="centered mt-2 mb-2">
      <section className="w-full centered">
        <h1 className="account bold">{balance.toFixed(2)} RMN</h1>
        <h5 className="faded">${(balance * 0.01).toFixed(2)} USD</h5>
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

      {transaction ? <TransactionForm /> : <Transactions data={transactions} />}
    </div>
  );
}
