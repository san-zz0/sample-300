import { useState } from "react";
import { useCategory } from "../CategoryContext";
import { MoreVertical } from "lucide-react";

const Category = () => {
  const { categories, addCategory, deleteCategory, editCategory } =
    useCategory();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [mode, setMode] = useState("add");
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Category</h1>
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => {
            setMode("add");
            setShowForm(true);
          }}
        >
          Add Category
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left bg-gray-300">
            <th className="p-3">Name</th>
            <th className="p-3">Products</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
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
                  <MoreVertical size={18} />

                  <div className="absolute right-0 mt-2 bg-white border border-gray-500 invisible group-hover:visible duration-200 z-10">
                    <button
                      onClick={() => {
                        setMode("edit");
                        setId(cat.id);
                        setName(cat.name);
                        setShowForm(true);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              setShowForm(false);
              setName("");
            }}
          />

          <div className="bg-white w-80 p-6 z-10">
            <h2 className="text-xl font-semibold mb-4">
              {mode === "add" ? "Add Category" : "Edit Category"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border px-3 py-2 mb-4 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded border"
                onClick={() => {
                  setShowForm(false);
                  setName("");
                }}
              >
                Cancel
              </button>

              {mode === "add" ? (
                <button
                  className="px-3 py-1 rounded bg-gray-800 text-white"
                  onClick={() => {
                    addCategory(name);
                    setShowForm(false);
                    setName("");
                  }}
                >
                  Add
                </button>
              ) : (
                <button
                  className="px-3 py-1 rounded bg-gray-800 text-white"
                  onClick={() => {
                    editCategory(id, name);
                    setShowForm(false);
                    setName("");
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
