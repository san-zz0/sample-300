import { useState } from "react";
import { useProduct } from "../ProductContext";
import { MoreVertical } from "lucide-react";
import { useCategory } from "../CategoryContext";

const Product = () => {
  const { products, addProduct, deleteProduct, editProduct } = useProduct();
  const { categories } = useCategory();
  const [id, setId] = useState(null);
  const [mode, setMode] = useState("add");
  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    sizes: {
      s: false,
      m: false,
      l: false,
    },
    orderType: {
      dine_in: false,
      takeaway: false,
    },
  });
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Product</h1>
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => {
            setMode("add");
            setShowForm(true);
          }}
        >
          Add Product
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left bg-gray-300">
            <th className="p-3" src={null}>
              Image
            </th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Sizes</th>
            <th className="p-3">Order Type</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-400">
              <td className="p-3">{product.image}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3 flex gap-2">
                {Object.keys(product.sizes)
                  .filter((x) => product.sizes[x])
                  .map((size) => (
                    <p className="bg-amber-200 w-6 h-6 text-center rounded-full">
                      {size.toUpperCase()}
                    </p>
                  ))}
              </td>
              <td className="p-3">
                {Object.keys(product.orderType)
                  .filter((x) => product.orderType[x])
                  .map((x) => x.toUpperCase())
                  .join(", ")}
              </td>
              <td className="p-3">
                <div className="relative inline-block group">
                  <MoreVertical size={18} />

                  <div className="absolute right-0 mt-2 bg-white border border-gray-500 invisible group-hover:visible duration-200 z-10">
                    <button
                      onClick={() => {
                        setMode("edit");
                        setId(product.id);
                        setForm(product);
                        setShowForm(true);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
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
              {mode === "add" ? "Add Product" : "Edit Product"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full border px-3 py-2 mb-4 focus:outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoFocus
            />

            <input
              type="number"
              placeholder="Stock"
              className="w-full border px-3 py-2 mb-4 focus:outline-none"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <select
              className="w-full border px-3 py-2 mb-4 focus:outline-none"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="mb-4">
              <p className="font-medium mb-2">Sizes</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.sizes.s}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sizes: { ...form.sizes, s: e.target.checked },
                      })
                    }
                  />
                  S
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.sizes.m}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sizes: { ...form.sizes, m: e.target.checked },
                      })
                    }
                  />
                  M
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.sizes.l}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sizes: { ...form.sizes, l: e.target.checked },
                      })
                    }
                  />
                  L
                </label>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-2">Order Type</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.orderType.dine_in}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        orderType: {
                          ...form.orderType,
                          dine_in: e.target.checked,
                        },
                      })
                    }
                  />
                  Dine In
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.orderType.takeaway}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        orderType: {
                          ...form.orderType,
                          takeaway: e.target.checked,
                        },
                      })
                    }
                  />
                  Takeaway
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded border"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1 rounded bg-gray-800 text-white"
                onClick={() => {
                  mode === "add" ? addProduct(form) : editProduct(id, form);
                  setShowForm(false);
                }}
              >
                {mode === "add" ? "Add" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
