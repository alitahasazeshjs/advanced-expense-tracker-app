import { Budget } from "../components/budget.js";
import { Card } from "../components/card.js";

const cards = [
    {
        header: "Total Budget",
        content: `<p class="amount green">+$650.00</p>`,
        icon: `<i class="fa-solid fa-money-check-dollar" style="color: green"></i>`
    },
    {
        header: "Spent",
        content: `<p class="amount red">-$525.00</p>`,
        icon: `<i class="fa-solid fa-money-bill-transfer" style="color: red"></i>`
    },
    {
        header: "Remaining",
        content: `<p class="amount">$750</p>`,
        icon: `<i class="fa-solid fa-wallet" style="color: var(--blue-color)"></i>`
    },
]

const budgets = [
  {
    color: "#4CAF50",
    category: "Food",
    budget: 500,
    spent: 325,
    transactions: 18
  },
  {
    color: "#2196F3",
    category: "Transport",
    budget: 300,
    spent: 185,
    transactions: 12
  },
  {
    color: "#FF9800",
    category: "Entertainment",
    budget: 200,
    spent: 140,
    transactions: 8
  },
  {
    color: "#9C27B0",
    category: "Shopping",
    budget: 400,
    spent: 275,
    transactions: 11
  },
  {
    color: "#F44336",
    category: "Utilities",
    budget: 350,
    spent: 310,
    transactions: 7
  },
  {
    color: "#00ACC1",
    category: "Health",
    budget: 250,
    spent: 120,
    transactions: 5
  },
  {
    color: "#795548",
    category: "Education",
    budget: 300,
    spent: 95,
    transactions: 4
  },
   {
    color: "#4CAF50",
    category: "Food",
    budget: 500,
    spent: 325,
    transactions: 18
  },
  {
    color: "#2196F3",
    category: "Transport",
    budget: 300,
    spent: 185,
    transactions: 12
  },
  {
    color: "#FF9800",
    category: "Entertainment",
    budget: 200,
    spent: 140,
    transactions: 8
  },
  {
    color: "#9C27B0",
    category: "Shopping",
    budget: 400,
    spent: 275,
    transactions: 11
  },
  {
    color: "#F44336",
    category: "Utilities",
    budget: 350,
    spent: 310,
    transactions: 7
  },
  {
    color: "#00ACC1",
    category: "Health",
    budget: 250,
    spent: 120,
    transactions: 5
  },
  {
    color: "#795548",
    category: "Education",
    budget: 300,
    spent: 95,
    transactions: 4
  },
   {
    color: "#4CAF50",
    category: "Food",
    budget: 500,
    spent: 325,
    transactions: 18
  },
  {
    color: "#2196F3",
    category: "Transport",
    budget: 300,
    spent: 185,
    transactions: 12
  },
  {
    color: "#FF9800",
    category: "Entertainment",
    budget: 200,
    spent: 140,
    transactions: 8
  },
  {
    color: "#9C27B0",
    category: "Shopping",
    budget: 400,
    spent: 275,
    transactions: 11
  },
  {
    color: "#F44336",
    category: "Utilities",
    budget: 350,
    spent: 310,
    transactions: 7
  },
  {
    color: "#00ACC1",
    category: "Health",
    budget: 250,
    spent: 120,
    transactions: 5
  },
  {
    color: "#795548",
    category: "Education",
    budget: 300,
    spent: 95,
    transactions: 4
  }
];

export const renderBudgets = () => {
    return `
       <div class="budgets-page">
            <div class="budgets-header">
                <h1 class="title">Budgets Summary</h1>
                <button class="page-add-btn add-budget-btn"><i class="fa-solid fa-plus"></i> Add Budget</button>
            </div>
            <div class="budget-summary-cards">
                ${cards.map(card => {
                    return Card(card.header, card.content, card.icon)
                }).join('')}
            </div>
                <h1 class="title">Budgets</h1>
            <div class="budgets-main">
                ${budgets.map(budget => {
                               return Budget(budget.category, budget.spent, budget.budget, budget.transactions, budget.color, true);
                           }).join("")}    
            </div>
    `  
}