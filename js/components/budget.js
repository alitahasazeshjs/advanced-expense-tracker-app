export const Budget = (category, spent, budget, transactions, color, actions) => {
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
                <span>$${spent}/$${budget}</span>
            </div>
            <div class="budget-progress-bar">
                <span style="width: ${(spent * 100) / budget}%; background-color: ${color}"></span>
            </div>
            <div class="budget-footer">
                <span>$${budget - spent} left</span>
                <span>${transactions} Transactions</span>
            </div>
        </div>
    `
}