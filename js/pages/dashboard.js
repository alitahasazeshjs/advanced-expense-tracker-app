import { Card } from "../components/card.js";
import { Budget } from "../components/budget.js";
import { RecentTransactionRow } from "../components/recentTransactions.js";
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
} from "../data/dashboardData.js";
import { getTransactions } from "../data/transactionData.js";
import { getBudgets } from "../data/budgetsData.js";

// const budgets = [
//   {
//     color: "#4CAF50",
//     category: "Food",
//     budget: 500,
//     spent: 325,
//     transactions: 18,
//   },
//   {
//     color: "#2196F3",
//     category: "Transport",
//     budget: 300,
//     spent: 185,
//     transactions: 12,
//   },
//   {
//     color: "#FF9800",
//     category: "Entertainment",
//     budget: 200,
//     spent: 140,
//     transactions: 8,
//   },
//   {
//     color: "#9C27B0",
//     category: "Shopping",
//     budget: 400,
//     spent: 275,
//     transactions: 11,
//   },
//   {
//     color: "#F44336",
//     category: "Utilities",
//     budget: 350,
//     spent: 310,
//     transactions: 7,
//   },
//   {
//     color: "#00ACC1",
//     category: "Health",
//     budget: 250,
//     spent: 120,
//     transactions: 5,
//   },
//   {
//     color: "#795548",
//     category: "Education",
//     budget: 300,
//     spent: 95,
//     transactions: 4,
//   },
// ];


export const renderDashbaord = () => {
  const budgets = getBudgets()
  console.log("Budgets:" ,budgets);
  const cards = [
    {
      header: "Total Income",
      content: `<p class="amount green">+$${getTotalIncome()}</p>`,
      icon: `<i class="fa-solid fa-money-bill-trend-up" style="color: green"></i>`,
    },
    {
      header: "Total Expenses",
      content: `<p class="amount red">-$${getTotalExpenses()}</p>`,
      icon: `<i class="fa-solid fa-money-bill-transfer" style="color: red"></i>`,
    },
    {
      header: "Total Balance",
      content: `<p class="amount" style="color: var(--blue-color)">$${getBalance()}</p>`,
      icon: `<i class="fa-solid fa-wallet" style="color: var(--blue-color)"></i>`,
    },
  ];

  const allTransactions = getTransactions();
  const sorted = allTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const recentTrans = sorted.slice(0, 5);

  return `
     <h1 class="title first-title"><i class="fa-solid fa-chart-simple" style="color: #3B82F6"></i> Summary</h1>
        <div class="cards">
            ${cards
              .map((card) => {
                return Card(card.header, card.content, card.icon);
              })
              .join("")}
        </div>
        <h1 class="title"><i class="fa-solid fa-chart-pie" style="color: #8B5CF6"></i> Budgets</h1>
        <div class="budgets">
            ${budgets.length > 0 ? budgets.slice(-5).reverse()
              .map((budget) => {
                return Budget(
                  budget.category,
                  budget.amount,
                  budget.categoryId
                );
              })
              .join("") : `<h1>No Budgets Yet</h1>`}    
        </div>
        <h1 class="title"><i class="fa-solid fa-arrow-right-arrow-left" style="color: #F59E0B"></i> Recent Transactions</h1>
        ${recentTrans.length === 0 ? `<div class="no-recent-trans-cont"><p class="no-recent-trans-message" >No Recent Transactions Yet</p></div>` : ` 
        <div class="recent-transactions">
            <div class="recent-trans-table-container">
                <table class="recent-transactions-table">
                    <tr>
                        <th><i class="fa-solid fa-money-bill"></i> Amount</th>
                        <th><i class="fa-solid fa-tag"></i> Category</th>
                        <th><i class="fa-solid fa-align-left"></i> Description</th>
                        <th><i class="fa-solid fa-calendar-days"></i> Date</th>
                        <th><i class="fa-solid fa-arrow-right-arrow-left"></i> Type</th>
                    </tr>
                    ${recentTrans
                    .map((transaction) => {
                        return RecentTransactionRow(transaction);
                    })
                    .join("")}
                </table>
            </div>
            <div class="all-trans-cont">
                <button class="see-more all-trans-btn">See all Transactions <i class="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>`}
       
    `;
};
