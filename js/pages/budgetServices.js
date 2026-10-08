import { getBudgets } from "../data/budgetsData.js";
import { getCategory } from "../data/categoriesData.js";
const modalRoot = document.querySelector("#modal-root");

export const addBudget = () => {
    const budgetCategory = document.querySelector('#budget-category');
    const budgetCategoryId = budgetCategory.selectedOptions[0].dataset.id;
    const budgetAmount = document.querySelector('#budget-amount');

    
    if(budgetAmount.value === '') {
        alert("Please enter an amount!");
        return;
    }
    if(budgetCategory.value === 'no-category') {
        alert("No Categories to create a budget!");
        return;
    }

    const budgets = getBudgets();
    const budgetExists = budgets.some(budget => budget.category === budgetCategory.value);
    if(budgetExists) {
        alert("Budget already exists!");
        return;
    }

    const newBudget = {
        id: crypto.randomUUID(),
        category: budgetCategory.value,
        amount: budgetAmount.value,
        categoryId: budgetCategoryId
    }

    
    budgets.push(newBudget);
    localStorage.setItem('budgets', JSON.stringify(budgets));
    modalRoot.classList.add('remove');
}