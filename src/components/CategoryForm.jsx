import { useEffect, useState } from "react";
import { useCategory } from "../CategoryContext";

const CategoryForm = ({ editData, closeForm }) => {
  const { addCategory, editCategory } = useCategory();

  const [form, setForm] = useState({
    name: "",
    products: "",
    stock: "",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData) {
      editCategory(form);
    } else {
      addCategory(form);
    }

    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-100">
      <h2 className="text-lg font-semibold mb-4">
        {editData ? "Edit Category" : "Add Category"}
      </h2>

      <input
        type="text"
        placeholder="Category Name"
        className="border w-full p-2 mb-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Products"
        className="border w-full p-2 mb-3"
        value={form.products}
        onChange={(e) => setForm({ ...form, products: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Stock"
        className="border w-full p-2 mb-4"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        required
      />

      <div className="flex gap-3">
        <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        <button
          type="button"
          onClick={closeForm}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
