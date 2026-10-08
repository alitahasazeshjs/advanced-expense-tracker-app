import { getCategory } from "../data/categoriesData.js"
import { getTransactions } from "../data/transactionData.js";

export const Budget = (category, amount, categoryId, actions) => {
    const categoryItem = getCategory(categoryId)[0];
    const color = categoryItem.color;
    const transactions = getTransactions().filter(trans => trans.category === category);
    let spent = 0;
    transactions.map(trans => {
        spent += Number(trans.amount);
    });
    console.log("Spent:", ((spent * 100) / amount))
    return `
        <div class="budget-card ${actions ? 'budget-list' : ''}">
            ${actions ? ` <div class="budget-actions">
                <button class="budget-actions-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                <div class="budget-actions-dropdown">
                    <button><i class="fa-solid fa-pen"></i> Edit</button>
                    <button><i class="fa-solid fa-trash-can"></i> Delete</button>
                </div>
            </div>` : ''}
           
            <div class="budget-header">
                <h3 style="text-transform: capitalize"><div class="budget-color" style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%;"></div>${category}</h3>
                <span>$${spent}/$${amount}</span>
            </div>
            <div class="budget-progress-bar">
                <span style="width: ${Math.min((spent * 100) / amount, 100)}%; background-color: ${color}"></span>
            </div>
            <div class="budget-footer">
                <span style="${spent > amount ? `color: #c80000` : ``}">$${spent > amount ? (spent - amount) + ` exceeded` : (amount - spent) + ` left`}</span>
                <span>${transactions.length} Transactions</span>
            </div>
        </div>
    `
}