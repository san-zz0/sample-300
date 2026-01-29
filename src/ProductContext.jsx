import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = (obj) => {
    console.log(obj);
    setProducts([...products, { id: crypto.randomUUID(), ...obj }]);
  };

  const deleteProduct = (id) => {
    console.log(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const editProduct = (id, obj) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...obj } : product,
      ),
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, editProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
