import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate(); 
    console.log(location.pathname);
    function pathMathRoute(route){
        if(route === location.pathname){
            return true
        }
    }
  return (
    <div className='bg-white border-b mt-1 shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
            <img src="https://www.homemoveis.com.br/wp-content/uploads/2021/02/cropped-home-moveis-logo-1024x522.png" alt="logo" className='h-12 cursor-pointer' onClick={()=> navigate("/")} />
        </div>
        <div>
            <ul className='cursor-pointer flex space-x-10 '>
                <li className={`py-3 text-sm font-semibold  text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/")&& "text-black border-b-red-500"}`} onClick={()=> navigate("/")}>Home</li>
                <li className={`py-3 text-sm font-semibold  text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers")&& "text-black border-b-red-500"}`} onClick={()=> navigate("/offers")}>Offers</li>
                <li className={`py-3 text-sm font-semibold  text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in")&& "text-black border-b-red-500"}`} onClick={()=> navigate("/sign-in")}>Sign In</li>
            </ul>
        </div>
      </header>
    </div>
  )
}
