import { Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./CategoryContext";
import Sidebar from "./components/Sidebar";
import Top from "./components/Top";
import Product from "./components/Product";
import Category from "./components/Category";
import Order from "./components/Order";

function App() {
  return (
    <CategoryProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Top />
          <div className="p-5">
            <Routes>
              <Route path="/products" element={<Product />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/orders" element={<Order />} />
            </Routes>
          </div>
        </div>
      </div>
    </CategoryProvider>
  );
}

export default App;
