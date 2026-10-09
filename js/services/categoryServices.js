import { getBudget, getBudgets } from "../data/budgetsData.js";
import { getCategories, getCategory } from "../data/categoriesData.js";
import { getTransactions } from "../data/transactionData.js";
import { renderCategoriesRow } from "./categoriesServices.js";
const modalRoot = document.querySelector("#modal-root");

export const addCategory = () => {
  const name = document.querySelector("#category-name");
  const type = document.querySelector("#category-type");
  const color = document.querySelector("#category-color");
  const categories = getCategories();

  if (name.value === "") {
    alert("Please enter a name");
    return;
  }
  const categoryExists = categories.some(
    (category) => category.name.toLowerCase() === name.value.toLowerCase()
  );
  if (categoryExists) {
    alert("Category Exists!");
    return;
  }

  const newCat = {
    id: crypto.randomUUID(),
    name: name.value,
    type: type.value,
    color: color.value,
  };
  categories.push(newCat);
  localStorage.setItem("categories", JSON.stringify(categories));
  modalRoot.classList.add('remove');
};

export const getCatTrans = (category) => {
  const transactions = getTransactions();
  return transactions.filter((trans) =>
    trans.category.toLowerCase().includes(category.toLowerCase())
  ).length;
};

export const getCatAmount = (category) => {
  const transactions = getTransactions();
  let total = 0;
  transactions
    .filter((trans) =>
      trans.category.toLowerCase().includes(category.toLowerCase())
    )
    .forEach((trans) => {
      total += Number(trans.amount);
    });
  return total;
};

export const editCategory = (id) => {
  const category = getCategory(id)[0];
  const categoryName = document.querySelector("#category-name");
  const categoryType = document.querySelector("#category-type");
  const categoryColor = document.querySelector("#category-color");
  const categoryTableBody = document.querySelector(".categories-table tbody");

  if (
    categoryName.value === category.name &&
    categoryType.value === category.type &&
    categoryColor.value === category.color
  ) {
    alert("Please enter some changes!");
    return;
  }

  const categories = getCategories();
  const transactions = getTransactions();
  const updatedTransactions = transactions.map((transaction) => {
    if (transaction.category.toLowerCase() === category.name.toLowerCase()) {
      transaction.category = categoryName.value.toLowerCase();
      transaction.type = categoryType.value;
      return transaction;
    } else {
      return transaction;
    }
  });
  localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  const categoryIndex = categories.findIndex((category) => category.id === id);
  categories[categoryIndex].name = categoryName.value;
  categories[categoryIndex].type = categoryType.value;
  categories[categoryIndex].color = categoryColor.value;
  localStorage.setItem("categories", JSON.stringify(categories));
  modalRoot.classList.add("remove");
  categoryTableBody.innerHTML = renderCategoriesRow(categories);
};

export const deleteCategory = (id) => {
  const categories = getCategories();
  const budgets = getBudgets();
  const category = getCategory(id)[0];
  const transactions = getTransactions();
  const updatedCategories = categories.filter((category) => category.id !== id);
  const updatedTransactions = transactions.filter((transaction) => {
    return transaction.category.toLowerCase() !== category.name.toLowerCase();
  });
  const updatedBudgets = budgets.filter(budget => budget.category.toLowerCase() !== category.name.toLowerCase());
  localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  localStorage.setItem("categories", JSON.stringify(updatedCategories));
  localStorage.setItem("budgets", JSON.stringify(updatedBudgets)) ;
  modalRoot.classList.add("remove");
};
