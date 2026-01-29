import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-300 text-gray-600 p-6">
      <h1 className="text-2xl text-gray-600 mb-6">Digital Menu</h1>

      <ul className="font-semibold flex flex-col gap-4">
        <li className="cursor-pointer">
          <Link to="/admin/products">Products</Link>
        </li>

        <li className="cursor-pointer">
          <Link to="/admin/categories">Categories</Link>
        </li>

        <li className="cursor-pointer">
          <Link to="/admin/orders">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
