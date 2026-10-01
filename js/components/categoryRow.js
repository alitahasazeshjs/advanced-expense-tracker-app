import { getCatAmount, getCatTrans } from "../services/categoryServices.js"

export const CategoryRow = (cateogry) => {
    return `
        <tr>
            <td>${cateogry.name}</td>
            <td>${cateogry.type}</td>
            <td>${getCatTrans(cateogry.name)}</td>
            <td>$${getCatAmount(cateogry.name)}</td>
            <td class="category-actions">
               <button class="table-edit-btn category-edit-btn" data-id="${cateogry.id}"><i class="fa-solid fa-pen"></i></button>
                <button class="table-delete-btn category-delete-btn" data-id="${cateogry.id}" ><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
    `
}