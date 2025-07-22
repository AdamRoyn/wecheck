"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkInput, sendQuery } from "@/components/InputValidator";

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#898AC4]">
      <div className="p-4 bg-[#A2AADB] rounded-2xl">
        <div className="mt-3 text-center text-[#FFF2E0]">
          <p className="font-bold text-2xl">WeCheck</p>
          <p className="font-semibold text-md">Simply Weather Checker</p>
        </div>

        <div className="mt-3 relative w-full">
          <input id="lokasion" className="w-full bg-[#FFF2E0] text-[#898AC4] rounded-3xl p-3 pr-13.5 outline-[#898AC4] focus:outline-4 transition-discrete duration-100" type="text" placeholder="Location/Coordinates.."
          onChange={checkInput}/>
          <button name="Go Search" id="search-button" className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#898AC4] text-[#FFF2E0] rounded-2xl p-1 hover:bg-[#C0C9EE] hover:text-[#898AC4] hover:outline-2 active:scale-85 outline-[#898AC4] transition-discrete duration-75 cursor-pointer" onClick={() => sendQuery(router)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
          </button>
        </div>

        { /* <div className="mt-3 flex items-center justify-center">  Switcher }
          <div className="bg-[#FFF2E0] rounded-2xl relative">
            <span className={`absolute z-0 h-full bg-[#899AC4] rounded-2xl transition-all duration-300 ease-in-out ${tempSwitch === "Celcius" ? "left-0 w-24" : "left-24 w-33"}`} />
            <button className={`relative z-10 px-6 font-medium rounded-2xl transition-colors duration-200 ease-in-out hover:cursor-pointer ${tempSwitch === "Celcius" ? "text-[#FFF2E0]" : "text-[#899AC4]"}`} onClick={setC}>Celcius</button>
            <button className={`relative z-10 text-center px-6 font-medium rounded-2xl transition-colors duration-200 ease-in-out hover:cursor-pointer ${tempSwitch === "Fahrenheit" ? "text-[#FFF2E0]" : "text-[#899AC4]"}`} onClick={setF}>Fahrenheit</button> {/*${tempSwitch === "Fahrenheit" ? "bg-[#899AC4] text-[#FFF2E0]" : "text-[#899AC4]"}
          </div>
        </div> */}
        
        <footer className="mt-3 text-center text-sm font-light">Created By <Link className="font-bold" href="https://admryn.vercel.app/">AdamRoyn</Link> (first project, yay!)</footer>
      </div>
    </div>
  );
}
