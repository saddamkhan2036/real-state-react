import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default function Header() {
  const [pageState, setPageState] = useState("sign in")
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  const auth = getAuth();
  useEffect(()=> {
    onAuthStateChanged(auth, (user)=>{
      if (user){
        setPageState("Profile")
      } else {
        setPageState("Sign in")
      }
    })
  })
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b mt-1 shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://www.homemoveis.com.br/wp-content/uploads/2021/02/cropped-home-moveis-logo-1024x522.png"
            alt="logo"
            className="h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="cursor-pointer flex space-x-10 ">
            <li
              className={`py-3 text-sm font-semibold  text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm font-semibold  text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 text-sm font-semibold  text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") ||
                (pathMatchRoute("/profile")) && "text-black border-b-red-500")
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
