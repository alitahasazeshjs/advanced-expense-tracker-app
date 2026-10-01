import { CategoryRow } from "../components/categoryRow.js";
import { getCategories } from "../data/categoriesData.js";

export const renderCategoriesRow = (categories = getCategories()) => {
    return categories.map(category => {
            return CategoryRow(category);
        }).join("")
}