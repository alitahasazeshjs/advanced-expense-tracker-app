import { Transactions } from "../components/transactions.js";
import { getTransactions } from "../data/transactionData.js";

export const renderTransactionsRows = (transactions = getTransactions()) => {
  return transactions
    .map((transaction) => {
      return Transactions(transaction);
    })
    .join("");
};

