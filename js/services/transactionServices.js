import { getTransaction, getTransactions } from "../data/transactionData.js";
const modalRoot = document.querySelector("#modal-root");

export const addTransaction = () => {
  const amount = document.querySelector("#transaction-amount");
  const category = document.querySelector("#transaction-category");
  const date = document.querySelector("#transaction-date");
  console.log("Date:", new Date(date.value).toISOString())
  const desc = document.querySelector("#transaction-desc");

  if (amount.value === "") {
    alert("Please enter an amount");
    return;
  }
  if(category.value === "no-category") {
    alert("No Category! Please create a category!");
    return;
  }
  if (desc.value === "") {
    alert("Please enter the description");
    return;
  }

  const newTransaction = {
    id: crypto.randomUUID(),
    amount: amount.value,
    category: category.value,
    date: date.value,
    type: category.selectedOptions[0].dataset.type,
    desc: desc.value,
  };

  const transactions = getTransactions();
  transactions.push(newTransaction);
  console.log("New Transactions:", transactions);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  modalRoot.classList.add("remove");
};

export const editTransaction = (id) => {
  const amount = document.querySelector("#transaction-amount");
  const category = document.querySelector("#transaction-category");
  const date = document.querySelector("#transaction-date");
  const desc = document.querySelector("#transaction-desc");
  

  console.log(amount.value);

  if (amount.value === "") {
    alert("Please enter an amount");
    return;
  }
  if (desc.value === "") {
    alert("Please enter the description");
    return;
  }

  const transactions = getTransactions();
  const transactionIndex = transactions.findIndex((trans) => trans.id === id);
  const transaction = getTransaction(id)[0];
  if (
    transaction.amount === amount.value &&
    transaction.category === category.value &&
    transaction.date === date.value &&
    transaction.desc === desc.value
  ) {
    alert("Please enter some changes.");
    return;
  } else {
    transactions[transactionIndex].amount = amount.value;
    transactions[transactionIndex].category = category.value;
    transactions[transactionIndex].type = category.selectedOptions[0].dataset.type;
    transactions[transactionIndex].date = date.value;
    transactions[transactionIndex].desc = desc.value;
  }

  localStorage.setItem("transactions", JSON.stringify(transactions));
  modalRoot.classList.add("remove");
};

export const deleteTransaction = (id) => {
  const transactions = getTransactions();
  const updatedTransactions = transactions.filter((trans) => trans.id !== id);
  localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  modalRoot.classList.add("remove");
};


// Fixing the exact minute seconds transactions added today filter
// Edit and Delete Categories