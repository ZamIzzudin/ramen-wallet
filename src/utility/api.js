/** @format */

export default (() => {
  const BASE_URL = "http://localhost:8000/api";

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

  async function initiateTransaction() {}

  return {
    getBalance,
    getTransactions,
    initiateTransaction,
  };
})();
