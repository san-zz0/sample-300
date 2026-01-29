import { Outlet } from "react-router-dom";
import Top from "./Top";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Top />
        <div className="p-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Layout;
