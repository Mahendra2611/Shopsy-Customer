import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/customerSlice";
import {
  LogOut,
  ShoppingBasket,
  User,
  ShoppingCart,
  Heart,
  ClipboardList,
  LayoutDashboard,
  Info,
  Phone,

  LogIn,
  UserPlus,
  Menu,
  X,
  Sun,
  Moon,
  Home, Store,
  Package,
  
} from "lucide-react";
import LOGO from "../../assets/logo.jpg"
import NotificationBell from "./Notification";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const dispatch = useDispatch();
  const { isAuthenticated, customer } = useSelector((state) => state.customer);
  const cart = useSelector((state) => state.cart);
  // console.log(cart)
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // const handleLogout = () => {
  //   localStorage.clear();
  //   sessionStorage.clear();
  // document.cookie.split(";").forEach((cookie) => {
  //   document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  // });
  // dispatch(logoutSuccess());
  // window.location.href = "/login";
  // };

  return (
    <nav className="sticky z-50 top-0 dark:bg-background-dark border-b-2 border-b-black dark:border-b-white bg-background-light shadow-md w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-black dark:text-white text-xl font-bold"
          >
           <img src={LOGO} className="rounded-full w-12 h-12"/>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`text-black flex flex-row gap-x-2 dark:text-white px-3 py-2 rounded-md ${
                currentPath === "/"
                  ? "bg-blue-500  text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
             <Home className="w-5 h-5"/> Home
            </Link>
            <Link
              to="/shops"
              className={`text-black flex flex-row gap-x-2 dark:text-white px-3 py-2 rounded-md ${
                currentPath === "/shops"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
             <Store className="w-5 h-5"/> Shops
            </Link>
            <Link
              to="/about"
              className={`text-black flex flex-row gap-x-2 dark:text-white px-3 py-2 rounded-md ${
                currentPath === "/about"
                  ? "bg-blue-500  text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
             <Info className="w-5 h-5"/> About
            </Link>
            {/*  <NotificationBell /> */}
            <Link
              to="/contact"
              className={`text-black flex flex-row gap-x-2 dark:text-white px-3 py-2 rounded-md ${
                currentPath === "/contact"
                  ? "bg-blue-500  text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
            <Phone size={20}/>  Contact
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-2 rounded-lg dark:text-white  ${
                    currentPath === "/login"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <LogIn size={20} /> Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-3 p-2 bg-heading-dark dark:bg-red-400 text-background-dark dark:text-background-light rounded-lg text-center justify-center hover:opacity-90"
                >
                  <UserPlus size={20} /> Create Account
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link
                  to="/orders"
                  className={`text-black flex flex-row gap-x-2 dark:text-white px-3 py-2 rounded-md ${
                    currentPath === "/orders"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                 <Package size={20}/> Orders
                </Link>
                <Link
                  to="/wishlist"
                  className={`text-black flex flex-row gap-x-2 dark:text-white px-3 py-2 rounded-md ${
                    currentPath === "/wishlist"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                 <Heart size={20}/> Wishlist
                </Link>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated && <NotificationBell className="md:hidden" />}
            {isAuthenticated &&<Link to={"/dashboard"} > <User className="hidden md:block text-black dark:text-white"
             />
             </Link>}
            <Link to="/cart" onClick={() => setIsOpen(false)}className="text-black relative dark:text-white">
              <ShoppingCart size={24} />{" "}
              {cart && Object.keys(cart).length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {Object.keys(cart).length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-black dark:text-white"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>

            <button
              className="md:hidden text-black dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden grid grid-cols-2 dark:bg-background-dark bg-background-light p-4 shadow-lg rounded-lg space-y-2 text-base font-medium dark:text-white text-black">
          <Link
            to="/shops"
            onClick={() => setIsOpen(false)}
            className={`flex relative   items-center gap-3 p-2 rounded-lg ${
              currentPath === "/shops"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <Store size={24} /> Shops
            {cart && Object.keys(cart).length > 0 && (
              <span className="absolute  bottom-5 left-5 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {Object.keys(cart).length}
              </span>
            )}
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              currentPath === "/about"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <Info size={20} /> About
          </Link>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              currentPath === "/"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <Home size={20} /> Home
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              currentPath === "/contact"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <Phone size={20} /> Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  currentPath === "/dashboard/update-profile"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  currentPath === "/orders"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <ClipboardList size={20} /> Orders
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  currentPath === "/wishlist"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <Heart size={20} /> Wishlist
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  currentPath === "/profile"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <User size={20} /> Profile
              </Link>
             
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  currentPath === "/login"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <LogIn size={20} /> Login
              </Link>
              <Link
                to="/signup" onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 bg-heading-dark dark:bg-heading-light text-background-dark dark:text-background-light rounded-lg text-center justify-center hover:opacity-90 ${
                  currentPath === "/signup"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:bg-red-400"
                }`}
              >
                <UserPlus size={20} /> Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
