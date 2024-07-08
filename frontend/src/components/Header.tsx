import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authData, selectIsAuth } from "../redux/slices/auth";
import { logout } from "../redux/slices/auth";
import NavItem from "./NavItem";
import { NavType } from "../types/NavType";

const navitems: NavType[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Profile",
    link: "/profile/",
  },
  {
    name: "My Vacancies",
    link: "/myvacancies/",
  },
  {
    name: "My Favorities",
    link: "/myfavorities/",
  },
  {
    name: "Browse Job",
    link: "/jobs",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const Header: React.FC = () => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(authData);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleActive = () => {
    setActive(!active);
  };

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out of your account?")) {
      setActive(false);
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate("/");
    }
  };
  
  useEffect(() => {
    const test = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    
    document.addEventListener('mousedown', (e) => test(e));

    return () => {
      document.removeEventListener('mousedown', (e) => test(e));
    }
  }, [])

  return (
    <header>
      <div ref={menuRef} className={active ? "main_menu_actvie" : "main_menu"}>
        <div className="main-menu">
          <nav>
            {navitems.map((item, index) => (
              <NavItem
                key={item.link}
                index={index}
                version={"mobile"}
                handleActive={handleActive}
                {...item}
              />
            ))}
          </nav>
          {isAuth ? (
            <div className="indentation">
              <div className="Appointment d-flex justify-content-between align-items-center direction">
                {location.pathname != "/create" &&
                  userData?.role == "Employee" && (
                    <div className="d-block">
                      <Link onClick={handleActive} to={"/create"} className="boxed-btn3 header">
                        Post a Job
                      </Link>
                    </div>
                  )}
                <div className="phone_num">
                  <a
                    className="logout"
                    onClick={onClickLogout}
                    style={{
                      cursor: "pointer",
                      fontSize: "16px",
                      marginRight: "30px",
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="indentation">
              <div className="phone_num">
                {location.pathname == "/login" ? (
                  <>
                    <Link onClick={handleActive} to={"/register"}>
                      <div className="boxed-btn3 header">Register</div>
                    </Link>
                  </>
                ) : (
                  <Link onClick={handleActive} to={"/login"}>
                    <div className="boxed-btn3 header">Log In</div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="header-area">
        <div id="sticky-header" className="main-header-area">
          <div className="container-fluid ">
            <div className="header_bottom_border">
              <div className="row align-items-center">
                <div className="col-xl-3 col-2">
                  <div className="logo">
                    <Link to={"/"}>
                      <img src="../img/logo.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="menu col-xl-9 col-10">
                  <input
                    type="checkbox"
                    id="burger-checkbox"
                    className="burger-checkbox"
                  />
                  <label
                    onClick={handleActive}
                    htmlFor="burger-checkbox"
                    className="burger"
                  ></label>
                </div>
                <div className="col-xl-6 col-lg-7 navbarr">
                  <div className="main-menu d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        {navitems.map((item, index) => (
                          <NavItem
                            key={item.link}
                            index={index}
                            version={"desktop"}
                            {...item}
                          />
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 d-none d-lg-block navbarr">
                  <div className="Appointment">
                    {isAuth ? (
                      <div className="Appointment">
                        {location.pathname != "/create" &&
                          userData?.role == "Employee" && (
                            <div className="d-none d-lg-block">
                              <Link
                                to={"/create"}
                                className="boxed-btn3 navbarr"
                              >
                                Post a Job
                              </Link>
                            </div>
                          )}
                        <div
                          className="phone_num d-none d-xl-block"
                          style={{ marginLeft: "30px" }}
                        >
                          <a
                            onClick={onClickLogout}
                            style={{ cursor: "pointer", fontSize: "16px" }}
                          >
                            Logout
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="phone_num d-none d-xl-block">
                        {location.pathname == "/login" ? (
                          <>
                            <Link to={"/register"}>
                              <div className="boxed-btn3">Register</div>
                            </Link>
                          </>
                        ) : (
                          <Link to={"/login"}>
                            <div className="boxed-btn3">Log In</div>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
