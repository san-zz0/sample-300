import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Noodles",
      products: 22,
      stock: 110,
    },
    {
      id: 2,
      name: "Rice",
      products: 22,
      stock: 110,
    },
    {
      id: 3,
      name: "Instant Food",
      products: 22,
      stock: 110,
    },
  ]);

  const addCategory = (category) => {
    setCategories([...categories, { ...category, id: categories.length + 1 }]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const editCategory = (updatedCategory) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat,
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
