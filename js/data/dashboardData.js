import { getTransactions } from "./transactionData.js";

export const getTotalIncome = () => {
  const transactions = getTransactions();
  let income = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      income += Number(transaction.amount);
    }
  });
  return income;
};

export const getTotalExpenses = () => {
  const transactions = getTransactions();
  let expense = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      expense += Number(transaction.amount);
    }
  });
  return expense;
};

export const getBalance = () => {
    return getTotalIncome() - getTotalExpenses();
}