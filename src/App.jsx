import { Route, Routes } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";
import Layout from "./components/Layout";
import Product from "./components/Product";
import Category from "./components/Category";
import Order from "./components/Order";

const App = () => {
  return (
    <CategoryProvider>
      <ProductProvider>
        <Routes>
          <Route path="/admin" element={<Layout />}>
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Category />} />
            <Route path="orders" element={<Order />} />
          </Route>
        </Routes>
      </ProductProvider>
    </CategoryProvider>
  );
};

export default App;
