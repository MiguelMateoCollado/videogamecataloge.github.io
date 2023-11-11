import { Outlet } from "react-router-dom";
import { NavbarSearch } from "../components/NavbarSearch";
const HomeLayout = () => {
  return (
    <div>
      <NavbarSearch />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
