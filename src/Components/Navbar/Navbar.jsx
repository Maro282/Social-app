// import styles from "./Navbar.module.css";
import { TfiWorld } from "react-icons/tfi";
import { RiHome3Fill } from "react-icons/ri";
import { FaPerson } from "react-icons/fa6";
import placeholder from "./../../assets/placeholder.jpg";
import { Switch } from "@heroui/react";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function NavbarComponent({ handleDarkMode, darkMode }) {
  const { userToken, setUserToken, userData } = useContext(AuthContext);

  return (
    <>
      <Navbar className="bg-gray-100  text-black shadow-xl items-center mb-5 dark:bg-gray-800 dark:text-white p-2  ">
        <div className="flex-col w-full ">
          <div className="flex justify-between  w-full ">
            <NavbarBrand className="flex  gap-2 text-xl items-center">
              <Link to="/">
                <TfiWorld className="text-sky-600 font-bold" />
              </Link>
              <p className="font-bold text-inherit text-2xl">Social</p>
            </NavbarBrand>

            <NavbarContent justify="end">
              {!userToken && (
                <NavbarItem className={` flex ${userToken && "hidden"}`}>
                  <NavLink to={"/login"}>Login</NavLink>
                </NavbarItem>
              )}

              {!userToken && (
                <NavbarItem className="text-white">
                  <Button
                    as={Link}
                    color="primary"
                    to={"/register"}
                    variant="flat"
                    size="sm"
                  >
                    Rigister
                  </Button>
                </NavbarItem>
              )}

              {/* User Avatar */}
              {userToken && (
                // <p>{userData?.name.split("")[0]}</p>
                <NavbarItem>
                  <Avatar
                    src={userData?.photo}
                    onError={(e) => {
                      e.target.src = placeholder;
                    }}
                  />
                </NavbarItem>
              )}

              {userToken && (
                <NavbarItem className="text-white">
                  <Button
                    size="sm"
                    as={Link}
                    color="danger"
                    to={"/login"}
                    variant="flat"
                    onClick={() => {
                      setUserToken("");
                      sessionStorage.removeItem("token");
                    }}
                  >
                    Logout
                  </Button>
                </NavbarItem>
              )}
            </NavbarContent>

            <Switch
              defaultSelected={darkMode}
              color="success"
              endContent={<FaMoon />}
              size="md"
              startContent={<IoSunnyOutline />}
              className="font-bold ms-2"
              onChange={() => {
                handleDarkMode();
              }}
            />
          </div>

          <NavbarContent className=" sm:flex mx-auto gap-4  " justify="center">
            {/* {userToken && (
            <NavbarItem>
              <NavLink to={""} className="relative">
                Home
              </NavLink>
            </NavbarItem>
          )} */}

            {/* {userToken && (
            <NavbarItem>
              <NavLink to={"/about"}>About</NavLink>
            </NavbarItem>
          )} */}

            {userToken && (
              <NavbarItem>
                <NavLink to={"/"}>
                  <RiHome3Fill className="text-3xl" />
                </NavLink>
              </NavbarItem>
            )}

            {userToken && (
              <NavbarItem>
                <NavLink to={"/profile"}>
                  <FaPerson className="text-3xl " />
                </NavLink>
              </NavbarItem>
            )}
          </NavbarContent>
        </div>
      </Navbar>
    </>
  );
}
