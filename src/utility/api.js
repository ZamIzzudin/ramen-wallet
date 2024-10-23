/** @format */

export default (() => {
  // const BASE_URL = "http://localhost:8000/api";
  const BASE_URL = "  https://ramen-chain.vercel.app/api";

  async function getBalance(address) {
    try {
      const response = await fetch(`${BASE_URL}/bc/wallet-balance/${address}`);
      const data = await response.json();

      return data;
    } catch (err) {
      return 0;
    }
  }

  async function getTransactions(address) {
    try {
      const response = await fetch(
        `${BASE_URL}/bc/wallet-transaction/${address}`
      );

      const data = await response.json();

      return data;
    } catch (err) {
      return [];
    }
  }

  async function initiateTransaction(transaction) {
    try {
      const response = await fetch(`${BASE_URL}/bc/add-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const data = await response.json();

      return data;
    } catch (err) {
      return {
        status: "failed",
      };
    }
  }

  async function getGasFee(amount) {
    try {
      const response = await fetch(`${BASE_URL}/bc/gas-fee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      return data;
    } catch (err) {
      return {
        status: "failed",
      };
    }
  }

  return {
    getBalance,
    getTransactions,
    initiateTransaction,
    getGasFee,
  };
})();
