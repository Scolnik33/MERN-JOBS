import React from "react";
import { Link } from "react-router-dom";
import { NavType } from "../types/NavType";
import { useSelector } from "react-redux";
import { authData } from "../redux/slices/auth";

const NavItem: React.FC<NavType> = ({ name, link, index, version, handleActive }) => {
  const userData = useSelector(authData);

  return (
    <>
      {link == '/profile/' ? (
        userData != null && (
          <li className={version == "mobile" && index == 0 ? "p-2 pt-3" : "p-2"}>
            <Link onClick={handleActive} className="navbar_item" to={link + userData?._id}>
              {name}
            </Link>
          </li>
        )
      ) : link == "/myfavorities/" ? (
        userData?.role == "Employer" && (
          <li
            className={version == "mobile" && index == 0 ? "p-2 pt-3" : "p-2"}
          >
            <Link onClick={handleActive} className="navbar_item" to={link + userData?._id}>
              {name}
            </Link>
          </li>
        )
      ) : link == "/myvacancies/" ? (
        userData?.role == "Employee" && (
          <li
            className={version == "mobile" && index == 0 ? "p-2 pt-3" : "p-2"}
          >
            <Link onClick={handleActive} className="navbar_item" to={link + userData._id}>
              {name}
            </Link>
          </li>
        )
      ) : (
        <li className={version == "mobile" && index == 0 ? "p-2 pt-3" : "p-2"}>
          <Link onClick={handleActive} className="navbar_item" to={link}>
            {name}
          </Link>
        </li>
      )}
    </>
  );
};

export default NavItem;
