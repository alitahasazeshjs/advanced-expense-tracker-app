export const getTransactions = () => {
    const transactions = localStorage.getItem('transactions') || [];
    return transactions.length === 0 ? [] : JSON.parse(transactions);
}

export const getTransaction = (id) => {
    const transactions = getTransactions();
    return transactions.filter(trans => trans.id === id);
}