import { Outlet } from "react-router-dom";
import { NavbarSearch } from "../components/NavbarSearch";
const HomeLayout = () => {
  return (
    <div className="p-3">
      <NavbarSearch />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
