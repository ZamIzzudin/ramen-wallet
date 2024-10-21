/** @format */
/* global chrome */
import { useEffect, useState } from "react";

import { StringFormat } from "../../utility/dateFormatter";
import { addressPrettier } from "../../utility/parser";
import wallet from "../../utility/wallet";
import api from "../../utility/api";
import useStore from "../../utility/store";

import {
  RiQrScan2Line,
  RiSendPlaneLine,
  RiSwap2Line,
  RiExchangeDollarLine,
} from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { GoStop } from "react-icons/go";

export default function TransactionForm() {
  const { details, transaction, updateTransaction } = useStore();
  const [responseStatus, setResponseStatus] = useState(null);
  const [gasFee, setGasFee] = useState(0);

  useEffect(() => {
    getGasFee();
  }, []);

  async function getGasFee() {
    const response = await api.getGasFee(transaction.amount);
    setGasFee(response);
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

  async function handleSubmit() {
    const payload = {
      from: details.address,
      to: transaction.to,
      amount: parseInt(transaction.amount) + parseInt(gasFee),
      type: "transfer",
    };

    payload.signature = wallet.signTransaction(details.wallet, payload);
    const response = await api.initiateTransaction(payload);

    if (response.status === "failed") {
      setResponseStatus("failed");
      setTimeout(() => {
        updateTransaction(null);
        setResponseStatus(null);
      }, 3000);
      chrome.runtime.sendMessage({
        type: "ramen-response",
        data: {
          status: "failed",
          message: "Transaction Failed",
        },
      });
    } else {
      setResponseStatus("success");
      setTimeout(() => {
        updateTransaction(null);
        setResponseStatus(null);
      }, 3000);
      chrome.runtime.sendMessage({
        type: "ramen-response",
        data: {
          status: "success",
          message: "Transaction Success",
        },
      });
    }
  }

  function handleReject() {
    updateTransaction(null);
    chrome.runtime.sendMessage({
      type: "ramen-response",
      data: {
        status: "failed",
        message: "Transaction Reject",
      },
    });
  }

  return (
    <section className="w-full centered py-2 px-3">
      {responseStatus ? (
        <div className="response-transaction-container w-full centered">
          {responseStatus === "success" ? (
            <>
              <div className="centered response-transaction-success">
                <FaCheck />
              </div>
              <h3 className="bold">Transaction Success</h3>
            </>
          ) : (
            <>
              <div className="centered response-transaction-failed">
                <GoStop />
              </div>
              <h3 className="bold">Transaction Failed</h3>
            </>
          )}
        </div>
      ) : (
        <div className=" w-full transaction-form">
          <span className="transaction-form-type centered">
            {transactionTypeRender(transaction.type)}
          </span>
          <h5 className="mt-1">{addressPrettier(transaction.to, 20)}</h5>
          <span className="faded">{StringFormat(transaction.date)}</span>
          <h2 className="bold mt-2 ">{transaction.amount} RMN </h2>
          <span className="faded mb-2">+ {gasFee} RMN (fee)</span>
          <div className="centered w-full">
            <button className="w-full" onClick={() => handleSubmit()}>
              Accept
            </button>
            <button
              className="w-full btn-secondary"
              onClick={() => handleReject()}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
