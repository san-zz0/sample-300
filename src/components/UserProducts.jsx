import { useState } from "react";
import { useProduct } from "../ProductContext";
import { useCart } from "../CartContext";
import Cart from "./Cart";
import { ShoppingCart } from "lucide-react";

const UserProducts = () => {
  const { products } = useProduct();
  const { cart, addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const toggleSize = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [size]: !prev?.[productId]?.[size],
      },
    }));
  };

  const setOrderType = (productId, orderType) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: orderType,
    }));
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cart.reduce(
    (sum, product) =>
      sum + Object.values(product.sizes).reduce((s, size) => s + size.qty, 0),
    0,
  );

  const handleAddToCart = (product) => {
    const sizes = selectedSizes[product.id];
    if (!sizes) return;

    Object.keys(sizes)
      .filter((size) => sizes[size])
      .forEach((size) => {
        const orderType =
          selectedOptions[product.id] ||
          (product.orderType?.dine_in ? "dine_in" : "takeaway");

        addToCart({
          id: product.id,
          name: product.name,
          size,
          price: product.prices[size],
          // order
          image: product.image,
          orderType,
        });
      });

    setSelectedSizes((prev) => ({
      ...prev,
      [product.id]: {},
    }));
    setSelectedOptions((prev) => ({
      ...prev,
      [product.id]: "",
    }));
  };

  return (
    <div>
      <nav className="bg-gray-500 text-white p-5 flex justify-between">
        <h1 className="font-bold">Shop</h1>
        <div
          className="relative cursor-pointer"
          onClick={() => setIsCartOpen((p) => !p)}
        >
          <ShoppingCart />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 w-5 h-5 text-xs rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </nav>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
        {products.map((product) => {
          const sizes = selectedSizes[product.id] || {};

          return (
            <div
              key={product.id}
              className="border border-gray-500 p-4 flex flex-col gap-3"
            >
              {product.image && (
                <img
                  src={URL.createObjectURL(product.image)}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(product.sizes)
                  .filter((size) => product.sizes[size])
                  .map((size) => {
                    const active = sizes[size];

                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(product.id, size)}
                        className={`px-3 py-1 text-sm rounded border border-gray-600 cursor-pointer
                        ${active ? "bg-gray-800 text-white" : "bg-white"}
                      `}
                      >
                        {size.toUpperCase()} &nbsp; ₹{product.prices[size]}
                      </button>
                    );
                  })}
              </div>

              {Object.values(product.orderType).every(Boolean) ? (
                <div>
                  <label className="mr-3">
                    Dine in
                    <input
                      type="radio"
                      name={`orderType-${product.id}`}
                      checked={selectedOptions[product.id] === "dine_in"}
                      className="ml-1"
                      onChange={() => setOrderType(product.id, "dine_in")}
                    />
                  </label>
                  <label>
                    Takeaway
                    <input
                      type="radio"
                      name={`orderType-${product.id}`}
                      className="ml-1"
                      checked={selectedOptions[product.id] === "takeaway"}
                      onChange={() => setOrderType(product.id, "takeaway")}
                    />
                  </label>
                </div>
              ) : (
                <div>
                  {product.orderType?.dine_in ? (
                    <p>Dine in</p>
                  ) : (
                    <p>Takeaway</p>
                  )}
                </div>
              )}
              {product.stock <= 5 && product.stock !== 0 && (
                <p className="text-sm text-amber-700">Stock is running out</p>
              )}
              {product.stock === 0 && (
                <p className="text-sm text-amber-700">Out of stock</p>
              )}
              <button
                onClick={() => handleAddToCart(product)}
                disabled={
                  !Object.values(sizes).some(Boolean) || product.stock === 0
                }
                // [true, false, false].some(Boolean)- true - not- false so not diasble
                className="px-3 py-2 rounded bg-yellow-300  disabled:opacity-60"
              >
                Add to Cart
              </button>
            </div>
          );
        })}

        <Cart isOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
};

export default UserProducts;
