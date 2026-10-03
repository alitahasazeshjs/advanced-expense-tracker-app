export const getBudgets = () => {
  const budgets = JSON.parse(localStorage.getItem("budgets"));
  return budgets === null ? [] : budgets;
};