import { Outlet, Link } from "react-router-dom";
import "../style.css";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
