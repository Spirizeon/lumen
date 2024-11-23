'use client'
import DownloadButton from "@/components/DownloadButton"
import UploadDIalog from "@/components/UploadDIalog"
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { file } from "pdfkit";

export interface IFile {
  _id?: string;
  report: string;
  filesize: number;
  filename: string;
  created_at?: string;
}



const Dashboard = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState("");

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/file');
      if (!response.status) throw new Error('Failed to fetch files');
      const data = response.data.data;
      console.log(data);
      setFiles(data);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [])

  const removeFile = async (fileId: string) => {
    try {
      setDeleteLoading(fileId);
      const response = await fetch(`/api/file/${fileId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove file');

      setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
      toast.success("Deleted Successfully");
    } catch (error) {
      console.error(error);
    }
    finally {
      setDeleteLoading("");
    }
  };



  const addFile = async (data: IFile) => {
    try {
      const response = await axios.post('/api/file/', data);
      if (response.status !== 201) throw new Error('Failed to add file');
      const addedFile = response.data.data;
      console.log(addedFile)
      setFiles(prevFiles => [...prevFiles, addedFile]);
    } catch (error) {
      console.error('Error adding file:', error);
    }
  };






  return (
    <section className="container px-4 py-10 sm:mx-auto">
      <div className="sm:flex flex-col mt-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Files uploaded</h2>

        <div className="flex items-center sm:justify-center justify-between mt-4 gap-x-3">
          <div className="relative flex items-center w-full  md:mt-0">

            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>

            <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>
          {/* <button className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-white dark:border-gray-700">
            Download all
          </button> */}

          <UploadDIalog onUpload={addFile} />
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                    <th className="px-12 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {loading ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td colSpan={5} className="w-full max-h-80 min-h-28 flex items-center justify-center">
                        {/* Ensure LoaderCircle is properly styled to be centered */}
                        <div className="flex items-center justify-center w-16 h-16">
                          <LoaderCircle className="animate-spin text-gray-500 dark:text-gray-300" />
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    files.map((file) => (
                      <tr key={file.filename}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <div className="flex items-center justify-center w-8 h-8 text-indigo-500 bg-indigo-100 rounded-full dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                              </div>
                              <div>
                                <h2 className="font-normal text-gray-800 dark:text-white">{file.filename}</h2>
                                <p className="text-xs font-normal text-gray-500 dark:text-gray-400">{file.filesize} KB</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                          {file.filesize} KB
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {file.created_at ? new Date(file.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <DownloadButton filename={file.filename.split('.').slice(0, -1).join('.')} report={file.report} />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <button
                            disabled={deleteLoading == file._id}
                            onClick={() => { removeFile(file._id || '') }}
                            className="px-6  py-3 text-sm flex items-center disabled:cursor-not-allowed justify-center gap-2 font-medium w-24 tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-600 focus:bg-red-600 focus:outline-none sm:mx-2"
                          >
                            {deleteLoading == file._id && <LoaderCircle size={20} className="animate-spin text-gray-100" />}  {deleteLoading == file._id ? "" : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button disabled className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>

          <span>
            previous
          </span>
        </button>

        <div className="items-center hidden md:flex gap-x-3">
          <p className="px-2 py-1 text-sm text-indigo-500 rounded-md dark:bg-gray-800 bg-indigo-100/60">1</p>
          {/* <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a> */}
        </div>

        <button disabled className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          <span>
            Next
          </span>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Dashboard
