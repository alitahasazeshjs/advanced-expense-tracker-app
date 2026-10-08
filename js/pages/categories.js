import { CategoryRow } from "../components/categoryRow.js";
import { getCategories } from "../data/categoriesData.js";
import { renderCategoriesRow } from "../services/categoriesServices.js";
const categories = [
  {
    name: "Food & Dining",
    type: "Expense",
    transactions: 24,
    amount: 485.5,
  },
  {
    name: "Transportation",
    type: "Expense",
    transactions: 12,
    amount: 156.75,
  },
  {
    name: "Shopping",
    type: "Expense",
    transactions: 18,
    amount: 320.0,
  },
  {
    name: "Entertainment",
    type: "Expense",
    transactions: 8,
    amount: 95.5,
  },
  {
    name: "Bills & Utilities",
    type: "Expense",
    transactions: 10,
    amount: 275.25,
  },
  {
    name: "Health",
    type: "Expense",
    transactions: 5,
    amount: 120.0,
  },
  {
    name: "Salary",
    type: "Income",
    transactions: 2,
    amount: 2500.0,
  },
  {
    name: "Freelance",
    type: "Income",
    transactions: 6,
    amount: 850.0,
  },
  {
    name: "Gifts",
    type: "Income",
    transactions: 3,
    amount: 200.0,
  },
  {
    name: "Other",
    type: "Expense",
    transactions: 7,
    amount: 75.0,
  },
  {
    name: "Other",
    type: "Expense",
    transactions: 7,
    amount: 75.0,
  },
  {
    name: "Other",
    type: "Expense",
    transactions: 7,
    amount: 75.0,
  },
  {
    name: "Other",
    type: "Expense",
    transactions: 7,
    amount: 75.0,
  },
  {
    name: "Other",
    type: "Expense",
    transactions: 7,
    amount: 75.0,
  },
  {
    name: "Other",
    type: "Expense",
    transactions: 7,
    amount: 75.0,
  },
  {
    name: "Other",
    type: "Expense",
    transactions: 7,
    amount: 75.0,
  },
  {
    name: "Other",
    type: "Expense",
    transactions: 7,
    amount: 75.0,
  },
];

export const renderCategories = () => {
  const categories = getCategories();
  return `
  <div class="categories-header">
      <h1 class="title"><i class="fa-solid fa-tags" style="color: var(--blue-color)"></i>Categories</h1>
      <button class="page-add-btn add-category-btn"><i class="fa-solid fa-plus"></i> Add Category</button>
  </div>
            ${
              categories.length > 0
                ? `<div class="categories">
            <div class="categories-input">
                 <div class="categories-input-item">
                    <label for="search-category">Search</label>
                    <input type="text" id="search-category" placeholder="Search Categories" />
                </div>
                <div class="categories-input-item">
                    <label for="search-category">Filter By:</label>
                    <div class="categories-filter-container">
                        <button class="active" data-type="all">All</button>
                        <button data-type="expense">Expense</button>
                        <button data-type="income">Income</button>
                    </div>
                </div>
            </div>
            <div class="categories-table-container">
                <table class="categories-table">
                    <thead>
                        <tr>
                            <th><i class="fa-solid fa-tag"></i> Name</th>
                            <th><i class="fa-solid fa-arrow-right-arrow-left"></i> Type</th>
                            <th><i class="fa-solid fa-arrow-right-arrow-left"></i> Transactions</th>
                            <th><i class="fa-solid fa-money-bill"></i> Amount</th>
                            <th><i class="fa-solid fa-screwdriver-wrench"></i> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderCategoriesRow()}
                    </tbody>
                </table>
            </div>
         </div>`
                : `<div class="empty-state-container"><h1>No Categories!</h1><p>Start adding categories to see them here!</p></div>`
            }
         
    `;
};
