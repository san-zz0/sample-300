import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = ({ id, name, size, price, image, orderType }) => {
    setCart((prev) => {
      const productExists = prev.find((p) => p.id === id);

      if (!productExists) {
        return [
          ...prev,
          {
            id,
            name,
            sizes: {
              [size]: { qty: 1, price },
            },
            image,
            orderType,
          },
        ];
      }

      return prev.map((product) => {
        if (product.id !== id) return product;

        const currentQty = product.sizes[size]?.qty || 0;

        return {
          ...product,
          sizes: {
            ...product.sizes,
            [size]: {
              qty: currentQty + 1,
              price,
            },
          },
        };
      });
    });
  };

  const updateQty = (id, size, delta) => {
    setCart((prev) =>
      prev.map((product) => {
        if (product.id !== id) return product;

        const newQty = product.sizes[size].qty + delta;

        if (newQty < 1) return product;

        return {
          ...product,
          sizes: {
            ...product.sizes,
            [size]: {
              ...product.sizes[size],
              qty: newQty,
            },
          },
        };
      }),
    );
  };

  const deleteSize = (id, size) => {
    setCart((prev) =>
      prev
        .map((product) => {
          if (product.id !== id) return product;

          const newSizes = { ...product.sizes };

          delete newSizes[size];

          if (Object.keys(newSizes).length === 0) {
            return null; // null and filter it out from the cart product
          }

          return { ...product, sizes: newSizes };
        })
        .filter(Boolean),
    );
  };

  const deleteSizeFromOrders = (id, size) => {
    setOrders((prev) =>
      prev
        .map((product) => {
          if (product.id !== id) return product;

          const newSizes = { ...product.sizes };

          delete newSizes[size];

          if (Object.keys(newSizes).length === 0) {
            return null; // null and filter it out from the cart product
          }

          return { ...product, sizes: newSizes };
        })
        .filter(Boolean),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        deleteSize,
        orders,
        setOrders,
        deleteSizeFromOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
