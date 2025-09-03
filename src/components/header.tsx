"use client";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY >= 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <div
      className={`flex justify-between py-4 w-full
      transition-all duration-700 fixed
      top-0 left-0 z-99
      ${scrolled ? 
        "bg-black px-14 text-white" : 
        "bg-white px-8 text-black"
      }`}
    >
      <div className="cursor-pointer hover:underline">Home</div>
      <div className="cursor-pointer hover:underline">All Recipie</div>
      <div className="cursor-pointer hover:underline">Contact</div>
      <div className="cursor-pointer hover:underline">Profile</div>
    </div>
  );
}
