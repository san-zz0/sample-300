import { useEffect, useState } from "react";
import { useCart } from "../CartContext";

const Order = () => {
  const { orders, deleteSizeFromOrders } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.name?.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left bg-gray-300">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Sizes</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Price</th>
            <th className="p-3">Order Type</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.orderId} className="border-b border-gray-400">
              <td className="p-3">
                {order.image && (
                  <img
                    src={URL.createObjectURL(order.image)}
                    alt={order.name}
                    className="w-11 h-11 object-cover"
                  />
                )}
              </td>
              <td className="p-3">{order.name}</td>
              <td className="p-3">
                {Object.keys(order.sizes).map((size) => (
                  <div key={size}>{size.toUpperCase()}</div>
                ))}
              </td>

              <td className="p-3">
                {Object.entries(order.sizes).map(([size, data]) => (
                  <div key={size}>{data.qty}</div>
                ))}
              </td>

              <td className="p-3">
                {Object.values(order.sizes).reduce(
                  (total, data) => total + +data.price * data.qty,
                  0,
                )}
              </td>

              <td className="p-3">{order.orderType}</td>

              <td className="p-3">
                {Object.entries(order.sizes).map(([size, data]) => (
                  <button
                    key={size}
                    onClick={() => deleteSizeFromOrders(order.orderId, size)}
                    className="text-red-600 block"
                  >
                    Remove
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
