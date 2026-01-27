import { useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

const Category = () => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Category</h1>

        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowForm(false)}
          />

          <div className="relative bg-white rounded-lg shadow-lg">
            <CategoryForm
              editData={editData}
              closeForm={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <CategoryTable
        openEdit={(data) => {
          setEditData(data);
          setShowForm(true);
        }}
      />
    </>
  );
};

export default Category;
