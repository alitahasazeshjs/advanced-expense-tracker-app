export const getCategories = () => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    return categories.length === '0' ? [] : categories; 
}
export const getCategory = (id) => {
  const categories = getCategories();
  return categories.filter((category) => category.id === id);
};