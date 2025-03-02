import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "./Firebase";

const Navabar = () => {

  const [userDetails,setuserDetails]=useState(null);
  const fetchUserData = async()=>{
    auth.onAuthStateChanged(async(user)=>{
      console.log(user);
      setuserDetails(user);
    })
  }
  useEffect(()=>{
    fetchUserData();
  },[]);

  async function handlelogout(){
    try {
      await auth.signOut();
      window.location.href="/";
    } catch (error) {
      console.log(error)
    }
  }



  const [theme, settheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("dark") : "light"
  );
  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);
  const [sticky, setsticky] = useState(false);
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setsticky(true);
      } else {
        setsticky(false);
      }
    };

    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  return (
    <>
      <div
        className={`max-w-screen-2xl bg-[#dbdee8] pb-3 container mx-auto md:px-20 px-4 fixed top-0 left-0 z-50 dark:bg-slate-900 dark:text-white ${
          sticky
            ? "sticky-navbar shadow-md bg-base-100 duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar">
          <div className="navbar-start pr-3 dark:bg-slate-900 dark:text-white ">
            <div className="search hidden md:block px-4 ">
              <label className=" px-2 py-1 border-2 dark:border-gray-300 border-gray-500 rounded-md flex items-center gap-2 ">
                <input
                  type="text"
                  className=" outline-none text-yellow-300 dark:placeholder-gray-300 placeholder-gray-800 dark:bg-slate-900 dark:text-white w-52 bg-[#dbdee8]"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 "
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
          {userDetails ? (
            <>
          <div className="avatar mt-3 md:mt-2 -ml-5 md:ml-[45rem]">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src="https://img.freepik.com/premium-vector/manager-icon_933463-4265.jpg?w=740" />
            </div>
          </div>
          <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>{userDetails.displayName}</summary>
                  <ul class="bg-base-100 rounded-t-none p-5 fixed z-50 dark:bg-slate-900 dark:text-white ">
                    <li>
                    <a href="/login" >Login</a>
                    </li>
                    <li>
                    <a href="/signin" >SignUp</a>
                    </li>
                    <li>
                      <a onClick={handlelogout} className="w-44 ">Logout</a> 
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          </>
          ) :(
              <p>Loading...</p>
          )}
          <div className="dark-mode ml-3 md:ml-10">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

              {/* sun icon */}
              <svg
                className="swap-off h-10 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => {
                  settheme(theme === "light" ? "dark" : "light");
                }}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                onClick={() => {
                  settheme(theme === "dark" ? "light" : "dark");
                }}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Navabar;
