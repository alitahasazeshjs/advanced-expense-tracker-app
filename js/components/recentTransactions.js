export const RecentTransactionRow = (transaction) => {
  return `
        <tr>
            <td>$${transaction.amount}</td>
            <td class="trans-cat">${transaction.category}</td>
            <td class="trans-desc">${transaction.desc}</td>
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
        </tr>
    `;
};
