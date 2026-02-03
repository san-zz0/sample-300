import { X } from "lucide-react";
import { useCart } from "../CartContext";
import { useEffect } from "react";

const Cart = ({ isOpen, closeCart }) => {
  const { cart, updateQty, deleteSize, setOrders } = useCart();

  const total = cart.reduce(
    (sum, product) =>
      sum + // diff
      Object.values(product.sizes).reduce(
        (s, size) => s + size.qty * size.price, // same
        0,
      ),
    0,
  );

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 ${!isOpen && "pointer-events-none"}
        `}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl
          transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          
        `}
      >
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-xl font-semibold">Cart</h2>
          <button onClick={closeCart} className="p-2  hover:bg-gray-200">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {cart.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {cart.map((product) => (
            <div key={product.id} className="mb-6">
              <p className="font-medium">{product.name}</p>
              {Object.entries(product.sizes).map(([size, data]) => (
                <div
                  key={size}
                  className="flex justify-between items-center mt-2"
                >
                  <p className="text-gray-600">
                    {size.toUpperCase()} &nbsp; ₹{data.price}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(product.id, size, -1)}
                      className="px-2 bg-gray-500 text-white rounded"
                    >
                      −
                    </button>

                    <span>{data.qty}</span>

                    <button
                      onClick={() => updateQty(product.id, size, 1)}
                      className="px-2 bg-gray-500 text-white rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => deleteSize(product.id, size)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div>
            <div className="p-4 border-t border-gray-400 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="px-4">
              <button
                onClick={() => setOrders(cart)}
                className="w-full text-white py-2 mt-1 rounded bg-yellow-500"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
