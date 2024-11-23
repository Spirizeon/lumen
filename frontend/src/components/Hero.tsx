'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const Hero = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKey, setIsKey] = useState(false);

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
    toast.success('💠 API Key copied to clipboard!');
  };

  const handleRemove = () => {
    Cookies.remove('api_key');
    setApiKey('');
    setIsKey(false);
    toast.success('💠 API Key has been removed!');
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-5 w-full">
        <img src="/logo.png" width={200} alt="Logo" />
        <h1 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
          <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
            💠 lumen 💠
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-center text-gray-700 dark:text-white md:text-xl">
          ai-fuelled malware threat intelligence system
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
          <input
            id="api_key"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="px-6 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 focus:ring-indigo-300 focus:ring-opacity-40 dark:focus:border-indigo-300 focus:outline-none focus:ring sm:mx-2"
            placeholder="Enter Gemini API Key"
          />
          {isKey ? (
            <div className="flex space-x-2 sm:mx-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
              >
                Copy Key
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-600 focus:bg-red-600 focus:outline-none"
              >
                Remove Key
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none sm:mx-2"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default Hero;
