import { getCategory } from "../data/categoriesData.js"
import { getTransactions } from "../data/transactionData.js";

export const Budget = (category, amount, categoryId, actions) => {
    const categoryItem = getCategory(categoryId)[0];
    const color = categoryItem.color;
    const transactions = getTransactions().filter(trans => trans.category === category);
    let spent = 0;
    transactions.map(trans => {
        spent += Number(trans.amount);
    })
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
                <h3><div class="budget-color" style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%;"></div>${category}</h3>
                <span>$${spent}/$${amount}</span>
            </div>
            <div class="budget-progress-bar">
                <span style="width: ${(spent * 100) / amount}%; background-color: ${color}"></span>
            </div>
            <div class="budget-footer">
                <span>$${amount - spent} left</span>
                <span>${transactions.length} Transactions</span>
            </div>
        </div>
    `
}