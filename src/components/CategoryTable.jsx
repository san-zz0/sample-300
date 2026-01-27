import { useCategory } from "../CategoryContext";
import { MoreVertical } from "lucide-react";

const CategoryTable = ({ openEdit }) => {
  const { categories, deleteCategory } = useCategory();

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-300">
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Products</th>
          <th className="p-3 text-left">Stock</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {categories.map((cat) => (
          <tr key={cat.id} className="border-b border-gray-400">
            <td className="p-3">{cat.name}</td>
            <td className="p-3">{cat.products}</td>
            <td className="p-3">{cat.stock}</td>
            <td className="p-3">
              <div className="relative inline-block group">
                <button className="p-1 hover:bg-gray-100">
                  <MoreVertical size={18} />
                </button>

                <div className="absolute right-0 mt-2 bg-white shadow-md invisible  group-hover:visible duration-200 z-10">
                  <button
                    onClick={() => openEdit(cat)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
