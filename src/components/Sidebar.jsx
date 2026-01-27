import { Box, Layers, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-56 bg-gray-300 text-gray-800  p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-600">Digital Menu</h1>

      <ul className="flex flex-col gap-2 font-semibold">
        <li className={`flex items-center gap-3 p-3  cursor-pointer`}>
          <Box size={20} />
          <Link to="/products">
            <span>Products</span>
          </Link>
        </li>

        <li className={`flex items-center gap-3 p-3 cursor-pointer`}>
          <Layers size={20} />
          <Link to="/categories">
            <span>Categories</span>
          </Link>
        </li>

        <li className={`flex items-center gap-3 p-3 cursor-pointer`}>
          <ShoppingCart size={20} />
          <Link to="/orders">
            <span>Orders</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
