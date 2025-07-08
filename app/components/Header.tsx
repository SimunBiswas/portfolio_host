'use client'

import { useEffect, useState } from "react";

const menus = ["home", "about", "services", "contact"];

export default function StickyNav() {
const [activeSection, setActiveSection] = useState('home');
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    menus.forEach((menu: string) => {
      const element = document.getElementById(menu);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
  return (
    <header className="fixed top-4 left-0 right-0 z-50 p-4 bg-black opacity-50 ">
      <div className="px-4 flex justify-end sm:hidden">
        <button
          className="cursor-pointer"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 246.42 246.04"
            className="fill-white w-8 h-8"
          >
            <rect x="0.79" y="30.22" width="245.63" height="23.36" rx="11.68" />
            <rect
              x="0.39"
              y="111.32"
              width="245.63"
              height="23.36"
              rx="11.68"
            />
            <rect y="192.42" width="245.63" height="23.36" rx="11.68" />
          </svg>
        </button>
      </div>
      <nav
        className={`${
          toggleMenu ? "flex bg-black opacity-200 transition duration-700 ease-in-out" : "hidden sm:flex"
        } justify-center items-center gap-3 sm:gap-5 lg:gap-10 sm:flex-row flex-col mt-2 sm:mt-0 `}
      >
        {menus.map((menu: string, i: number) => {
          return (
            <a
              key={i}
              href={`#${menu}`}
              className={`w-full sm:w-auto uppercase font-semibold text-base text-white text-center sm:px-3 lg:px-5 py-2 sm:py-1 rounded-2xl transition-all ease-linear hover:bg-green hover:shadow-md ${
                activeSection == menu ? "bg-green shadow-md" : ""
              }`}
            >
              {menu}
            </a>
          );
        })}
      </nav>
    </header>
  );

}