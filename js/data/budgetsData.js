export const getBudgets = () => {
  const budgets = JSON.parse(localStorage.getItem("budgets"));
  return budgets === null ? [] : budgets;
};

export const getBudget = (id) => {
  return getBudgets().filter(budget => budget.id === id);
} 