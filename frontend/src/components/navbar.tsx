'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationItem {
  title: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigation: NavigationItem[] = [
    { title: 'Docs', path: 'javascript:void(0)' },
    { title: 'Design', path: 'javascript:void(0)' },
    { title: 'Forum', path: 'javascript:void(0)' },
    { title: 'Use Case', path: 'javascript:void(0)' }
  ];

  return (
    <nav className=" bg-black z-50 w-full  fixed top-0  md:border-0 ">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="javascript:void(0)" className='flex items-center justify-center gap-2'>
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="logo"
            />
            <p className='text-xl text-white'>Segfault Squad</p>
          </a>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:bg-transparent md:mt-0 ${isOpen ? 'block bg-black' : 'hidden'}`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx} className="text-gray-200 hover:text-indigo-600">
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:inline-block">
          <Link
            href="/dashboard"
            className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
