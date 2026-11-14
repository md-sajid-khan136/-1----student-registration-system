import { NavLink } from "react-router-dom";
import { INSTITUTION_NAME } from "../constants.js";

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <span className="brand">{INSTITUTION_NAME}</span>
        <nav aria-label="Main">
          <NavLink to="/register">Register student</NavLink>
          <NavLink to="/students">All students</NavLink>
        </nav>
      </div>
    </header>
  );
}
