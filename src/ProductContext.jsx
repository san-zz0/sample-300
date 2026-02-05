import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("products =", products);
  }, [products]);

  const addProduct = (obj) => {
    setProducts([...products, { id: crypto.randomUUID(), ...obj }]);
  };

  const deleteProduct = (id) => {
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
      value={{ products, addProduct, deleteProduct, editProduct, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
