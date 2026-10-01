export const Transactions = (transaction) => {
  return `
        <tr>
            <td>$${transaction.amount}</td>
            <td class="trans-cat">${transaction.category}</td>
            <td classs="trans-desc">${transaction.desc}</td>
            <td>${transaction.date}</td>
            <td><span class="${transaction.type}-type trans-type">${transaction.type}</span></td>
            <td class="transaction-actions">
                <button class="table-edit-btn transaction-edit-btn" data-id="${transaction.id}"><i class="fa-solid fa-pen"></i></button>
                <button class="table-delete-btn transaction-delete-btn"  data-id="${transaction.id}"><i class="fa-solid fa-trash-can"></i></<button>
            </td>
        </tr>
    `;
};
