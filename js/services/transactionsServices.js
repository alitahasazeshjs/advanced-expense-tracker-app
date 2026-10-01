import { Transactions } from "../components/transactions.js";
import { getTransactions } from "../data/transactionData.js";

export const renderTransactionsRows = (transactions = getTransactions()) => {
  console.log("TRANSACTIONS:", transactions);
  return transactions
    .map((transaction) => {
      return Transactions(transaction);
    })
    .join("");
};

