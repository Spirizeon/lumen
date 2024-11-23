'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Copy, Trash, User } from 'lucide-react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKey, setIsKey] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedApiKey = Cookies.get('api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsKey(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Cookies.set('api_key', apiKey, { expires: 7 });
    setIsKey(true);
    toast.success('API Key has been saved in cookies!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API Key copied to clipboard!');
  };

  const handleRemove = () => {
    Cookies.remove('api_key');
    setApiKey('');
    setIsKey(false);
    toast.success('API Key has been removed!');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar} type="button" className="fixed items-center p-2 mt-2  ml-2 left-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <aside
        className={`fixed flex flex-col top-0 left-0 z-30 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-transparent backdrop-blur-md dark:border-gray-700 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 lg:hidden"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <div className='flex items-center justify-start gap-2'>
          <Image className="w-auto h-10" height={200} width={200} src="/logo.png" alt="" />
          <p className="text-xl font-extrabold text-center">
            <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
              Adamantium
            </span>
          </p>
        </div>

        <div className="flex flex-col justify-end flex-1 mt-6">
          <div className="mt-6">
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
              <input
                id="api_key"
                disabled={isKey}
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Claude API Key" />

              {isKey ? (
                <div className="flex justify-between gap-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-6 py-1.5 w-full text-sm text-center flex items-center justify-center text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
                  >
                    <Copy size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="py-1.5 pl-10 pr-4 w-full text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-600 focus:bg-red-600 focus:outline-none"
                  >
                    <Trash size={15} />
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 w-full text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
                >
                  Submit
                </button>
              )}
            </form>

            <div className="flex items-center justify-between mt-6">
              <a href="#" className="flex items-center gap-x-4">
                <User />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Log In</span>
              </a>

              <a href="#" className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-indigo-500 dark:hover:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
