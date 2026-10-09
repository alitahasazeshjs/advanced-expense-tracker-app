import { renderDashbaord } from "./pages/dashboard.js";
import { renderTransactions } from "./pages/transactions.js";
import { renderCategories } from "./pages/categories.js";
import { renderBudgets } from "./pages/budgets.js";
import { Modal } from "./components/modal.js";
import { getThemeFromLS, setTheme } from "./utils/theme.js";
import { getCategories, getCategory } from "./data/categoriesData.js";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "./services/transactionServices.js";
import { getTransaction, getTransactions } from "./data/transactionData.js";
import { renderTransactionsRows } from "./services/transactionsServices.js";
import {
  addCategory,
  deleteCategory,
  editCategory,
} from "./services/categoryServices.js";
import { renderCategoriesRow } from "./services/categoriesServices.js";
import { addBudget } from "./pages/budgetServices.js";
import { getBudget, getBudgets } from "./data/budgetsData.js";

// Elements
const app = document.getElementById("app");
const navItems = document.querySelectorAll(".nav-item");
console.log(navItems);

const container = document.querySelector(".main-body");
const settings = document.querySelector(".settings-item");
const modalRoot = document.querySelector("#modal-root");

const sidebar = document.querySelector("#sidebar");

let applyTransactionsFilters;
let applyCategoriesFilters;

// Datas
const defaultCategories = [
  {
    id: "cat-exp-food",
    name: "Food",
    type: "expense",
    color: "#F97316",
  },
  {
    id: "cat-exp-transport",
    name: "Transport",
    type: "expense",
    color: "#3B82F6",
  },
  {
    id: "cat-exp-housing",
    name: "Housing",
    type: "expense",
    color: "#8B5CF6",
  },
  {
    id: "cat-exp-utilities",
    name: "Utilities",
    type: "expense",
    color: "#06B6D4",
  },
  {
    id: "cat-exp-shopping",
    name: "Shopping",
    type: "expense",
    color: "#EC4899",
  },
  {
    id: "cat-exp-entertainment",
    name: "Entertainment",
    type: "expense",
    color: "#A855F7",
  },
  {
    id: "cat-exp-health",
    name: "Health",
    type: "expense",
    color: "#EF4444",
  },
  {
    id: "cat-exp-education",
    name: "Education",
    type: "expense",
    color: "#14B8A6",
  },
  {
    id: "cat-exp-travel",
    name: "Travel",
    type: "expense",
    color: "#0EA5E9",
  },
  {
    id: "cat-exp-personal-care",
    name: "Personal Care",
    type: "expense",
    color: "#F43F5E",
  },
  {
    id: "cat-exp-other",
    name: "Other",
    type: "expense",
    color: "#64748B",
  },

  // Income categories
  {
    id: "cat-inc-salary",
    name: "Salary",
    type: "income",
    color: "#22C55E",
  },
  {
    id: "cat-inc-freelance",
    name: "Freelance",
    type: "income",
    color: "#84CC16",
  },
  {
    id: "cat-inc-investment",
    name: "Investment",
    type: "income",
    color: "#10B981",
  },
  {
    id: "cat-inc-gift",
    name: "Gift",
    type: "income",
    color: "#EAB308",
  },
  {
    id: "cat-inc-other",
    name: "Other Income",
    type: "income",
    color: "#6366F1",
  },
];

if (!localStorage.getItem("categories")) {
  localStorage.setItem("categories", JSON.stringify(defaultCategories));
}

// Selected Page
let selected;

// Get Theme from local storage
let currentTheme = localStorage.getItem("theme");
if (!currentTheme || currentTheme === "undefined") {
  currentTheme = "light";
}

// Get & Set Theme From Localstorage
setTheme(getThemeFromLS());

// Navbar
const pages = {
  dashboard: renderDashbaord,
  transactions: renderTransactions,
  categories: renderCategories,
  budgets: renderBudgets,
};

const navigateTo = (page) => {
  const selectedPage = pages[page];

  selected = page;
  navItems.forEach((itemChild) => {
    if (selected === itemChild.dataset.page) {
      itemChild.classList.add("active");
    } else {
      itemChild.classList.remove("active");
    }
  });
  if (!selectedPage) {
    return;
  }
  app.innerHTML = selectedPage();

  if (selected === "categories") {
    handleAddCatButton();
    handleCategoriesActions();
    handleCategoriesFilter();
  }
  if (selected === "budgets") {
    handleBudgetActionsDropDown();
    handleAddBugetButton();
    handleBudgetActions();
  }
  if (selected === "transactions") {
    handleAddTransactionModal();
    handleTransactionActions();
    handleTransactionsFilter();
  }
  if (selected === "dashboard") {
    const seeAllTransBtn = document.querySelector(".all-trans-btn");
    if (seeAllTransBtn) {
      seeAllTransBtn.addEventListener("click", () => {
        navigateTo("transactions");
      });
    }
  }
};

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const pageName = item.dataset.page;

    navigateTo(pageName);
  });
});
navigateTo("dashboard");

const sidebarToggle = document.querySelector(".sidebar-toggle");
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarToggle.innerHTML = `<i class="fa-solid fa-close"></i>`;
  } else {
    sidebarToggle.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }
});

// Modal Close Functionallity and Theme Functionallity
modalRoot.addEventListener("click", (e) => {
  if (
    e.target.closest(".modal-close") ||
    e.target.closest(".modal-cancel-btn")
  ) {
    modalRoot.classList.add("remove");
  }

  const themeButton = e.target.closest(".theme-select button");
  if (themeButton) {
    const themeButtons = document.querySelectorAll(".theme-select button");
    themeButtons.forEach((button) => {
      button.classList.remove("active");
    });
    currentTheme = themeButton.dataset.theme;
    themeButton.classList.add("active");

    const theme = themeButton.dataset.theme;
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }
});

// Settings Modal
const settingsModalConf = {
  content: `
 <div class="settings-content">
    <div class="settings-modal-item">
      <span class="settings-label">Theme</span>
      <div class="theme-select">
        <button data-theme="light"><i class="fa-solid fa-sun"></i>Light</button>
        <button data-theme="dark"><i class="fa-solid fa-moon"></i>Dark</button>
      </div>
    </div>
    <div class="settings-modal-item">
      <span class="settings-label">Transaction Type:</span>
      <div class="select-wrapper">
        <select>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
     <div class="settings-modal-item">
      <span class="settings-label">Currency:</span>
      <div class="select-wrapper">
        <select>
          <option value="usd">USD (US Dollor)</option>
          <option value="euro">Euro (Euro)</option>
          <option value="cad">CAD (Candian Dollor)</option>
        </select>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>
    <div class="settings-modal-item data-options">
      <span class="settings-label">Data:</span>
      <div class="data-buttons">
        <button><i class="fa-solid fa-file-export"></i> Export</button>
        <button><i class="fa-solid fa-file-import"></i> Import</button>
        <button class="clear-all"><i class="fa-solid fa-trash-can"></i> Clear</button>
      </div>
    </div>
 </div>
`,
};

settings.addEventListener("click", () => {
  modalRoot.classList.remove("remove");
  modalRoot.innerHTML = Modal(
    "<i class='fa-solid fa-gear' style='color: var(--blue-color)'></i>Settings",
    settingsModalConf.content
  );
  const themeButtons = document.querySelectorAll(".theme-select button");
  themeButtons.forEach((button) => {
    if (currentTheme === button.dataset.theme) {
      button.classList.add("active");
    }
  });
});

// Add Category Button
const addCategoryModaConf = {
  content: `
    <div class="modal-inner add-category-modal">
      <div class="modal-item">
        <label for="category-name">Name</label>
        <input type="text" id="category-name" placeholder="Food, Clothing..."/>
      </div>
      <div class="modal-item">
        <label for="category-type">Type</label>
        <div class="select-wrapper">
          <select id="category-type">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            </select>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      <div class="modal-item">
        <label for="category-color">Color</label>
        <input type="color" id="category-color" />
      </div>
    </div>
    <div class="modal-footer-buttons">
      <button class="modal-cancel-btn">Cancel</button>
      <button class="modal-pos-btn">Save</button>
    </div>
  `,
};
function handleAddCatButton() {
  const addCatBtn = document.querySelector(".add-category-btn");
  console.log(addCatBtn);
  addCatBtn.addEventListener("click", (e) => {
    modalRoot.classList.remove("remove");
    modalRoot.innerHTML = Modal(
      "<i class='fa-solid fa-tags' style='color: var(--blue-color)'></i>Add Category",
      addCategoryModaConf.content
    );
    const modalAddCategoryBtn = document.querySelector(".modal-pos-btn");
    modalAddCategoryBtn.addEventListener("click", () => {
      addCategory();
    });
  });
}

// Budget Actions Dropdown Logic
function handleBudgetActionsDropDown() {
  const budgetActionsBtn = document.querySelectorAll(".budget-actions-btn");
  const budgetDropdowns = document.querySelectorAll(".budget-actions-dropdown");
  console.log(budgetDropdowns);

  budgetActionsBtn.forEach((budgetActionBtn) => {
    budgetActionBtn.addEventListener("click", (e) => {
      const dropdown = e.target.parentElement.nextElementSibling;

      const isOpen = dropdown.classList.contains("open");

      budgetDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
      if (!isOpen) {
        dropdown.classList.add("open");
      }
    });
  });
  document.addEventListener("click", (e) => {
    const clickedInsideDropdown = e.target.closest(".budget-actions-dropdown");
    const clickedDropdownbtn = e.target.closest(".budget-actions-btn");
    if (!clickedInsideDropdown && !clickedDropdownbtn) {
      budgetDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    }
  });
}

// Budget Edit and Delete Logic
function handleBudgetActions() {
  const editBudgetBtns = document.querySelectorAll(".edit-budget-btn");
  const deleteBudgetBtns = document.querySelectorAll(".delete-budget-btn");

  editBudgetBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {

      const budgetDropdowns = document.querySelectorAll(".budget-actions-dropdown");
      budgetDropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
      })

      const budgetId = editBtn.dataset.id;
      const budget = getBudget(budgetId)[0];
      const editBudgetModalConf = {
        content: `
          <div class="modal-inner add-budget-modal">
            <div class="modal-item add-budget-item">
              <label for="budget-category">Category</label>
              <div class="select-wrapper">
                <select id="budget-category">
                    ${
                      getCategories().length === 0
                        ? `<option selected value="no-category">No Category</option>`
                        : getCategories().map((category) => {
                            if (category.type === "expense") {
                              return `<option value="${category.name.toLowerCase()}" data-type="${
                                category.type
                              }" data-id="${category.id}" ${
                                budget.category === category.name.toLowerCase()
                                  ? `selected`
                                  : ``
                              }>${category.name}</option>`;
                            }
                          })
                    }
                </select>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
            </div>
            <div class="modal-item add-budget-item">
              <label for="budget-type">Budget Amount</label>
              <input type="number" id="budget-amount" placeholder="100, 200..." value="${
                budget.amount
              }"/>
            </div>
          </div>
          <div class="modal-footer-buttons">
            <button class="modal-cancel-btn">Cancel</button>
            <button class="modal-pos-btn">Edit Budget</button>
          </div>
        `,
      };
      modalRoot.classList.remove("remove");
      modalRoot.innerHTML = Modal(
        "<i class='fa-solid fa-chart-pie' style='color: var(--blue-color)'></i>Edit Budget",
        editBudgetModalConf.content
      );

      const editBudgetBtn = document.querySelector('.modal-pos-btn');
      editBudgetBtn.addEventListener('click', () => {
        const updatedBudgetCategory = document.querySelector('#budget-category');
        const updatedBudgetAmount = document.querySelector('#budget-amount');
        const updatedCategoryId = updatedBudgetCategory.selectedOptions[0].dataset.id;
        if(budget.category.toLowerCase() === updatedBudgetCategory.value.toLowerCase() && budget.amount === updatedBudgetAmount.value) {
          alert("Please enter some changes");
          return;
        }
        
        const budgets = getBudgets();
        const budgetIndex =  budgets.findIndex(budget => budget.id === budgetId);
        budgets[budgetIndex].category = updatedBudgetCategory.value;
        budgets[budgetIndex].amount = updatedBudgetAmount.value;
        budgets[budgetIndex].categoryId = updatedCategoryId;
      
        localStorage.setItem('budgets', JSON.stringify(budgets));
        modalRoot.classList.add('remove');
        navigateTo("budgets");
      })
    });
  });

  deleteBudgetBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {

      const budgetDropdowns = document.querySelectorAll(".budget-actions-dropdown");
      budgetDropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
      })

      const budgetId = deleteBtn.dataset.id;
      const deleteCategoryModal = {
        content: `
              <div class="modal-inner delete-modal">
                <h1 class="delete-modal-title">Do you want to delete this budget?</h1>
                </div>
                <div class="modal-footer-buttons add-transaction-buttons">
                <button class="modal-cancel-btn delete-modal-cancel-btn">Cancel</button>
                <button class="delete-modal-delete-btn">Delete</button>
            </div>
          `,
      };
      modalRoot.classList.remove("remove");
      modalRoot.innerHTML = Modal(
        "<i class='fa-solid fa-trash-can'></i> Delete Budget",
        deleteCategoryModal.content
      );

      const editBudgetBtn = document.querySelector('.delete-modal-delete-btn');
      editBudgetBtn.addEventListener('click', () => {
       
        const updatedBudgets = getBudgets().filter(budget => budget.id !== budgetId);
      
        localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
        modalRoot.classList.add('remove');
        navigateTo("budgets");
      })
    });
  });

} 

// Handle Add Budget Modal

function handleAddBugetButton() {
  const addBudgetModalConf = {
    content: `
      <div class="modal-inner add-budget-modal">
        <div class="modal-item add-budget-item">
          <label for="budget-category">Category</label>
          <div class="select-wrapper">
            <select id="budget-category">
                ${
                  getCategories().length === 0
                    ? `<option selected value="no-category">No Category</option>`
                    : getCategories().map((category) => {
                        if (category.type === "expense") {
                          return `<option value="${category.name.toLowerCase()}" data-type="${
                            category.type
                          }" data-id="${category.id}">${
                            category.name
                          }</option>`;
                        }
                      })
                }
            </select>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <div class="modal-item add-budget-item">
          <label for="budget-type">Budget Amount</label>
          <input type="number" id="budget-amount" placeholder="100, 200..."/>
        </div>
      </div>
      <div class="modal-footer-buttons">
        <button class="modal-cancel-btn">Cancel</button>
        <button class="modal-pos-btn">Add Budget</button>
      </div>
    `,
  };
  const addBudgetBtn = document.querySelector(".add-budget-btn");
  addBudgetBtn.addEventListener("click", () => {
    modalRoot.classList.remove("remove");
    modalRoot.innerHTML = Modal(
      "<i class='fa-solid fa-chart-pie' style='color: var(--blue-color)'></i>Add Budget",
      addBudgetModalConf.content
    );

    const modalAddBudgetButton = document.querySelector(".modal-pos-btn");
    modalAddBudgetButton.addEventListener("click", () => {
      addBudget();
      navigateTo("budgets");
    });
  });
}

// Handle Add Transaction Modal

function handleAddTransactionModal() {
  const addTransactionBtn = document.querySelector(".add-transaction-btn");
  addTransactionBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Add Transaction button clicked");
    console.log("Add transaction e.target:", e.target);
    console.log("Add transaction e.currentTarget:", e.currentTarget);
    const addTransactionModal = {
      content: `
    <div class="modal-inner">
      <div class="modal-item">
        <label for="transaction-amount">Amount</label>
        <input type="number" id="transaction-amount" placeholder="200, 120..." />
      </div>
      <div class="modal-item">
        <label for="transaction-category">Category</label>
        <div class="select-wrapper">
          <select id="transaction-category">
            ${
              getCategories().length === 0
                ? `<option value="no-category">No Category</option>`
                : getCategories().map((category) => {
                    console.log(category.name);
                    return `<option value="${category.name.toLowerCase()}" data-type="${
                      category.type
                    }">${category.name}</option>`;
                  })
            }
          </select>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      <div class="modal-item">
        <label for="transaction-date">Date</label>
        <input type="date" id="transaction-date" value="${
          new Date().toISOString().split("T")[0]
        }"/>
      </div>
      <div class="modal-item">
        <label for="transaction-desc">Description</label>
        <input type="text" id="transaction-desc" placeholder="Weekly Groceries..." />
      </div>

    </div>
    <div class="modal-footer-buttons add-transaction-buttons">
      <button class="modal-cancel-btn">Cancel</button>
      <button class="modal-pos-btn">Add Transaction</button>
    </div>
  `,
    };
    modalRoot.classList.remove("remove");
    modalRoot.innerHTML = Modal(
      "<i class='fa-solid fa-arrow-right-arrow-left' style='color: var(--blue-color)'></i> Add Transaction",
      addTransactionModal.content
    );
    const modalAddTransactionBtn = document.querySelector(".modal-pos-btn");
    modalAddTransactionBtn.addEventListener("click", () => {
      addTransaction();
      navigateTo("transactions");
    });
  });
}

// Edit and Delete Transactions
function handleTransactionActions(isFiltered) {
  const transactionEditBtns = document.querySelectorAll(
    ".transaction-edit-btn"
  );
  const transactionDeleteBtns = document.querySelectorAll(
    ".transaction-delete-btn"
  );
  transactionEditBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest("button").dataset.id;
      const transaction = getTransaction(id)[0];
      console.log("Transaction:", transaction);

      const editTransactionModalConf = {
        content: `
            <div class="modal-inner">
              <div class="modal-item">
                <label for="transaction-amount">Amount</label>
                <input type="number" id="transaction-amount" placeholder="200, 120..." value=${
                  transaction.amount
                }   />
              </div>
              <div class="modal-item">
                <label for="transaction-category">Category</label>
                <div class="select-wrapper">
                  <select id="transaction-category">
                    ${getCategories().map((category) => {
                      console.log(category.name);
                      return `<option value="${category.name.toLowerCase()}" data-type="${
                        category.type
                      }" ${
                        category.name.toLowerCase() === transaction.category
                          ? "selected"
                          : ""
                      }>${category.name}</option>`;
                    })}
                  </select>
                  <i class="fa-solid fa-chevron-down"></i>
                </div>
              </div>
              <div class="modal-item">
                <label for="transaction-date">Date</label>
                <input type="date" id="transaction-date" value="${
                  transaction.date
                }"/>
              </div>
              <div class="modal-item">
                <label for="transaction-desc">Description</label>
                <input type="text" id="transaction-desc" placeholder="Weekly Groceries..." value="${
                  transaction.desc
                }" />
              </div>

          </div>
          <div class="modal-footer-buttons add-transaction-buttons">
            <button class="modal-cancel-btn">Cancel</button>
            <button class="modal-pos-btn">Edit Transaction</button>
          </div>
        `,
      };
      modalRoot.classList.remove("remove");
      modalRoot.innerHTML = Modal(
        "<i class='fa-solid fa-pen'></i> Edit Transaction",
        editTransactionModalConf.content
      );
      const modalEditTransactionBtn = document.querySelector(".modal-pos-btn");
      modalEditTransactionBtn.addEventListener("click", () => {
        const searchTrans = document.querySelector("#search-trans");

        editTransaction(id);
        applyTransactionsFilters();
        if (isFiltered) {
          return;
        } else {
          navigateTo("transactions");
        }
      });
    });
  });

  transactionDeleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const deleteTransactionModal = {
        content: `
              <div class="modal-inner delete-modal">
                <h1 class="delete-modal-title">Do you want to delete this transaction?</h1>
              </div>
            <div class="modal-footer-buttons add-transaction-buttons">
              <button class="modal-cancel-btn delete-modal-cancel-btn">Cancel</button>
              <button class="delete-modal-delete-btn">Delete</button>
            </div>
          `,
      };

      modalRoot.classList.remove("remove");
      modalRoot.innerHTML = Modal(
        "<i class='fa-solid fa-trash-can'></i> Delete Transaction",
        deleteTransactionModal.content
      );
      const modalDeleteBtn = document.querySelector(".delete-modal-delete-btn");
      const id = e.target.closest("button").dataset.id;
      modalDeleteBtn.addEventListener("click", (e) => {
        deleteTransaction(id);

        applyTransactionsFilters();
        if (isFiltered && getTransactions().length > 0) {
          return;
        } else {
          navigateTo("transactions");
        }
      });
    });
  });
}

// Handle Categories Actions
function handleCategoriesActions(isFiltered) {
  const categoriesEditBtns = document.querySelectorAll(".category-edit-btn");
  const categoriesDeleteBtns = document.querySelectorAll(
    ".category-delete-btn"
  );
  categoriesEditBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest(".category-edit-btn").dataset.id;
      console.log("Id:", id);
      const category = getCategory(id)[0];
      console.log("Category:", category);
      const editCategoryModal = {
        content: `
        <div class="modal-inner add-category-modal">
        <div class="modal-item">
        <label for="category-name">Name</label>
        <input type="text" id="category-name" placeholder="Food, Clothing..." value="${
          category.name
        }"/>
        </div>
        <div class="modal-item">
        <label for="category-type">Type</label>
        <div class="select-wrapper">
        <select id="category-type" value="${category.type}">
        <option value="expense" ${
          category.type === "expense" ? "selected" : ""
        }>Expense</option>
        <option value="income" ${
          category.type === "income" ? "selected" : ""
        }>Income</option>
        </select>
        <i class="fa-solid fa-chevron-down"></i>
        </div>
        </div>
        <div class="modal-item">
        <label for="category-color">Color</label>
        <input type="color" id="category-color" value="${category.color}" />
        </div>
        </div>
        <div class="modal-footer-buttons">
        <button class="modal-cancel-btn">Cancel</button>
        <button class="modal-pos-btn">Save</button>
        </div>
        `,
      };
      modalRoot.classList.remove("remove");
      modalRoot.innerHTML = Modal(
        "<i class='fa-solid fa-tags' style='color: var(--blue-color)'></i>Add Category",
        editCategoryModal.content
      );
      const editCategoryBtn = document.querySelector(".modal-pos-btn");
      editCategoryBtn.addEventListener("click", () => {
        editCategory(id);
        applyCategoriesFilters();
        if (isFiltered) {
          return;
        } else {
          navigateTo("categories");
        }
      });
    });
  });
  categoriesDeleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const deleteCategoryModal = {
        content: `
              <div class="modal-inner delete-modal">
                <h1 class="delete-modal-title">Do you want to delete this category?</h1>
              </div>
            <div class="modal-footer-buttons add-transaction-buttons">
              <button class="modal-cancel-btn delete-modal-cancel-btn">Cancel</button>
              <button class="delete-modal-delete-btn">Delete</button>
            </div>
          `,
      };

      modalRoot.classList.remove("remove");
      modalRoot.innerHTML = Modal(
        "<i class='fa-solid fa-trash-can'></i> Delete Category",
        deleteCategoryModal.content
      );
      const modalDeleteBtn = document.querySelector(".delete-modal-delete-btn");
      const id = e.target.closest("button").dataset.id;
      modalDeleteBtn.addEventListener("click", (e) => {
        deleteCategory(id);
        applyCategoriesFilters();
        if (isFiltered && getCategories().length > 0) {
          return;
        } else {
          navigateTo("categories");
        }
      });
    });
  });
}

// Transactions Filter
function handleTransactionsFilter() {
  const searchTrans = document.querySelector("#search-trans");
  const categoryFilter = document.querySelector("#category-filter");
  const typeFilter = document.querySelector("#type-filter");
  const orderFilter = document.querySelector("#order-filter");
  const transactionsTableBody = document.querySelector(
    ".transactions-table tbody"
  );

  applyTransactionsFilters = () => {
    let transactions = getTransactions();
    if (categoryFilter.value === "all" && typeFilter.value === "all") {
      transactions = getTransactions();
    }
    if (searchTrans.value !== "") {
      transactions = transactions.filter(
        (trans) =>
          trans.category
            .toLowerCase()
            .includes(searchTrans.value.trim().toLowerCase()) ||
          trans.desc
            .toLowerCase()
            .includes(searchTrans.value.trim().toLowerCase())
      );
    }
    // Category Filter logic
    if (categoryFilter.value !== "all") {
      transactions = transactions.filter((trans) =>
        trans.category
          .toLowerCase()
          .includes(categoryFilter.value.toLowerCase())
      );
    }
    // Type Filter Logic
    if (typeFilter.value !== "all") {
      transactions = transactions.filter((trans) =>
        trans.type.toLowerCase().includes(typeFilter.value.toLowerCase())
      );
    }

    // Order filter
    if (orderFilter.value === "date-desc") {
      transactions = transactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
    if (orderFilter.value === "date-asc") {
      transactions = transactions.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }
    if (orderFilter.value === "amount-desc") {
      transactions = transactions.sort((a, b) => b.amount - a.amount);
    }
    if (orderFilter.value === "amount-asc") {
      transactions = transactions.sort((a, b) => a.amount - b.amount);
    }
    if (orderFilter.value === "category-asc") {
      transactions = transactions.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
    }
    if (orderFilter.value === "category-desc") {
      transactions = transactions.sort((a, b) =>
        b.category.localeCompare(a.category)
      );
    }

    if (transactions.length === 0 && getTransactions().length !== 0) {
      transactionsTableBody.innerHTML =
        "<p class='no-trans-found'>No Transactions!</p>";
    } else {
      transactionsTableBody.innerHTML = renderTransactionsRows(transactions);
    }

    handleTransactionActions(true);
  };

  applyTransactionsFilters();

  searchTrans.addEventListener("input", applyTransactionsFilters);
  categoryFilter.addEventListener("change", applyTransactionsFilters);
  typeFilter.addEventListener("change", applyTransactionsFilters);
  orderFilter.addEventListener("change", applyTransactionsFilters);
}

// Categories Filter
function handleCategoriesFilter() {
  let categoriesTypeFilter = "all";
  const categoriesTypeBtns = document.querySelectorAll(
    ".categories-filter-container button"
  );
  const categoryTableBody = document.querySelector(".categories-table tbody");
  categoriesTypeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      categoriesTypeBtns.forEach((button) => {
        button.classList.remove("active");
      });
      e.target.classList.add("active");
      categoriesTypeFilter = e.target.dataset.type;
      applyCategoriesFilters();
    });
  });
  const searchCategory = document.querySelector("#search-category");
  applyCategoriesFilters = () => {
    let categories = getCategories();
    if (categoriesTypeFilter !== "all") {
      categories = categories.filter(
        (category) => category.type === categoriesTypeFilter
      );
    }
    if (searchCategory.value !== "") {
      categories = categories.filter((category) =>
        category.name
          .toLowerCase()
          .includes(searchCategory.value.trim().toLowerCase())
      );
    }
    console.log("Length:", getCategories().length);
    if (categories.length === 0 && getCategories().length !== 0) {
      categoryTableBody.innerHTML =
        "<p class='no-trans-found'>No Categories!</p>";
    } else {
      categoryTableBody.innerHTML = renderCategoriesRow(categories);
    }
    console.log("CATEGOIES:", categories);
    handleCategoriesActions(true);
  };
  searchCategory.addEventListener("input", applyCategoriesFilters);
}

// Reviewed the git hub lessons, and pushed this project to my github
// Have to implement the budgets functionallity and also learn as much about gihub
// Good Luck :) 10/1/2026  7:22 P.M Thursday Night
