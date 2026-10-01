import { getCategories } from "../data/categoriesData.js";
import { getTransactions } from "../data/transactionData.js";
import { renderTransactionsRows } from "../services/transactionsServices.js";

const transactions = [
  {
    amount: 45.5,
    category: "Food",
    description: "Grocery shopping",
    date: "2026-09-19",
    type: "Expense",
  },
  {
    amount: 650,
    category: "Salary",
    description: "September salary",
    date: "2026-09-18",
    type: "Income",
  },
  {
    amount: 25,
    category: "Transport",
    description: "Taxi to work",
    date: "2026-09-17",
    type: "Expense",
  },
  {
    amount: 120,
    category: "Electronics",
    description: "Wireless keyboard",
    date: "2026-09-16",
    type: "Expense",
  },
  {
    amount: 300,
    category: "Freelance",
    description: "Website project payment",
    date: "2026-09-15",
    type: "Income",
  },
  {
    amount: 35,
    category: "Entertainment",
    description: "Movie and snacks",
    date: "2026-09-14",
    type: "Expense",
  },
  {
    amount: 120,
    category: "Electronics",
    description: "Wireless keyboard",
    date: "2026-09-16",
    type: "Expense",
  },
  {
    amount: 300,
    category: "Freelance",
    description: "Website project payment",
    date: "2026-09-15",
    type: "Income",
  },
  {
    amount: 35,
    category: "Entertainment",
    description: "Movie and snacks",
    date: "2026-09-14",
    type: "Expense",
  },
  {
    amount: 120,
    category: "Electronics",
    description: "Wireless keyboard",
    date: "2026-09-16",
    type: "Expense",
  },
  {
    amount: 300,
    category: "Freelance",
    description: "Website project payment",
    date: "2026-09-15",
    type: "Income",
  },
  {
    amount: 35,
    category: "Entertainment",
    description: "Movie and snacks",
    date: "2026-09-14",
    type: "Expense",
  },
  {
    amount: 120,
    category: "Electronics",
    description: "Wireless keyboard",
    date: "2026-09-16",
    type: "Expense",
  },
  {
    amount: 300,
    category: "Freelance",
    description: "Website project payment",
    date: "2026-09-15",
    type: "Income",
  },
  {
    amount: 35,
    category: "Entertainment",
    description: "Movie and snacks",
    date: "2026-09-14",
    type: "Expense",
  },
  {
    amount: 120,
    category: "Electronics",
    description: "Wireless keyboard",
    date: "2026-09-16",
    type: "Expense",
  },
  {
    amount: 300,
    category: "Freelance",
    description: "Website project payment",
    date: "2026-09-15",
    type: "Income",
  },
  {
    amount: 35,
    category: "Entertainment",
    description: "Movie and snacks",
    date: "2026-09-14",
    type: "Expense",
  },
  {
    amount: 120,
    category: "Electronics",
    description: "Wireless keyboard",
    date: "2026-09-16",
    type: "Expense",
  },
  {
    amount: 300,
    category: "Freelance",
    description: "Website project payment",
    date: "2026-09-15",
    type: "Income",
  },
  {
    amount: 35,
    category: "Entertainment",
    description: "Movie and snacks",
    date: "2026-09-14",
    type: "Expense",
  },
];

export const renderTransactions = () => {
  console.log("Got Rendered");
  return `  
  <div class="transactions">
        <div class="transactions-header">
            <h1 class="title"><i class="fa-solid fa-arrow-right-arrow-left" style="color: var(--blue-color)"></i>Transactions</h1>
             <button class="page-add-btn add-transaction-btn"><i class="fa-solid fa-plus"></i> Add Transaction</button>
        </div>
        <div class="transactions-input">
            <div class="transacton-input-item">
                <label for="search-trans">Search</label>
                <input type="text" id="search-trans" placeholder="Search Transactions" />
            </div>
            <div class="transacton-input-item">
                <label for="category-filter">Category</label>
                <div class="select-wrapper">
                    <select id="category-filter">
                        <option value="all" selected>All</option>
                         ${getCategories().map((category) => {
                                      console.log(category.name);
                                      return `<option value="${category.name.toLowerCase()}" data-type="${
                                        category.type
                                      }">${category.name}</option>`;
                                    })}
                    </select>
                     <i class="fa-solid fa-chevron-down"></i>
                </div>
                
            </div>
            <div class="transacton-input-item">
                <label for="type-filter">Type</label>
                <div class="select-wrapper">
                    <select id="type-filter">
                        <option value="all" selected >All</option>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                     <i class="fa-solid fa-chevron-down"></i>

                </div>
               
            </div>
           
            <div class="transacton-input-item">
                <label for="order-filter">Order</label>
                <div class="select-wrapper">
                    <select id="order-filter">
                        <option value="date-desc">Date: Newest → Oldest</option>
                        <option value="date-asc">Date: Oldest → Newest</option>
                        <option value="amount-desc">Amount: Highest → Lowest</option>
                        <option value="amount-asc">Amount: Lowest → Highest</option>
                        <option value="category-asc">Category: A → Z</option>
                        <option value="category-desc">Category: Z → A</option>
                    </select>
                     <i class="fa-solid fa-chevron-down"></i>
                </div>
               
            </div>
        </div>
        <div class="transactions-container">
            ${
              getTransactions().length === 0
                ? "<div class='no-trans-mes-cont'><p class='no-trans-message'>Add Transactions to See Your Transactions!</p></div>"
                : ` 
            <table class="transactions-table">
                <thead>
                    <tr>
                        <th><i class="fa-solid fa-money-bill"></i> Amount</th>
                        <th><i class="fa-solid fa-tag"></i> Category</th>
                        <th><i class="fa-solid fa-align-left"></i> Description</th>
                        <th><i class="fa-solid fa-calendar-days"></i> Date</th>
                        <th><i class="fa-solid fa-arrow-right-arrow-left"></i> Type</th>
                        <th><i class="fa-solid fa-screwdriver-wrench"></i> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderTransactionsRows()}
                </tbody>
            </table>`
            }
           
        </div>
  </div>
       
    `;
};
