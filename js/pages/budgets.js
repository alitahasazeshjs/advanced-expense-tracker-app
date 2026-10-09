import { Budget } from "../components/budget.js";
import { Card } from "../components/card.js";
import { getBudgets } from "../data/budgetsData.js";
import { getTransactions } from "../data/transactionData.js";

export const renderBudgets = () => {
  const budgets = getBudgets();

    let amount = 0;
    budgets.forEach(budget => {
        amount += Number(budget.amount)
    })

    let spent = 0;
    const transactions = getTransactions().filter(transaction => {
        return budgets.some(budget => budget.category === transaction.category);
    });
    transactions.forEach(trans => {
      spent += Number(trans.amount);
    });

    const remaining = amount - spent;

  const cards = [
    {
      header: "Total Budget",
      content: `<p class="amount green">$${amount}</p>`,
      icon: `<i class="fa-solid fa-money-check-dollar" style="color: green"></i>`,
    },
    {
      header: "Spent",
      content: `<p class="amount red">-$${spent}</p>`,
      icon: `<i class="fa-solid fa-money-bill-transfer" style="color: red"></i>`,
    },
    {
      header: "Remaining",
      content: `<p class="amount" style="color: var(--blue-color)">$${remaining < 0 ? 0 : remaining}</p>`,
      icon: `<i class="fa-solid fa-wallet" style="color: var(--blue-color)"></i>`,
    },
  ];

  return `
       <div class="budgets-page">
            <div class="budgets-header">
                <h1 class="title">Budgets Summary</h1>
                <button class="page-add-btn add-budget-btn"><i class="fa-solid fa-plus"></i> Add Budget</button>
            </div>
            <div class="budget-summary-cards">
                ${cards
                  .map((card) => {
                    return Card(card.header, card.content, card.icon);
                  })
                  .join("")}
            </div>
                <h1 class="title">Budgets</h1>
            <div class="budgets-main">
                ${
                  budgets.length > 0
                    ? `${budgets
                        .map((budget) => {
                          return Budget(
                            budget.id,
                            budget.category,
                            budget.amount,
                            budget.categoryId,
                            true
                          );
                        })
                        .join("")}`
                    : `<div class="empty-state-container"><h1>No Budgets Yet!</h1> <p>Add a budget and it wil show up here.</p></div>`
                }
            </div>
    `;
};
