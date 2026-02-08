import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const storedCategory = localStorage.getItem("categories");
    return storedCategory ? JSON.parse(storedCategory) : [];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name) => {
    setCategories([
      ...categories,
      { id: crypto.randomUUID(), name, products: 0, stock: 0 },
    ]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const editCategory = (id, name) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name } : category,
      ),
    );
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, deleteCategory, editCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
