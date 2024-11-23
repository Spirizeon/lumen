'use client'
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { resolve } from 'path';
import { IFile } from './Dashboard';
import random from 'random';

export interface UploadDialogProps {
  onUpload: (data: IFile) => Promise<void>;
}

const report = `
Objective and Intent:

Simulation of Malicious Behavior: The program is designed to simulate potentially malicious actions. Although it does not perform actual harm, it mimics behaviors that could be part of a malicious attack.

Components:

File Access:

Target File: /etc/passwd is a critical system file containing user account information. The code attempts to read this file, which could be used to gather sensitive data.

Potential Impact: If run with elevated privileges, this code could reveal information about system users, which might be leveraged for further attacks.

Network Activity:

Placeholder Function: The network simulation is a placeholder and does not perform any actual network operations. However, it suggests that real code could be added here for network-based attacks.

Potential Impact: Real network activity could be used for data exfiltration, communication with a remote server, or other malicious purposes.

Overall Design:

Modular Structure: The program is divided into functions that simulate different aspects of malicious behavior—file access and network communication.

Safe Execution: The program does not perform any real malicious actions, but it is structured in a way that could be adapted for malicious purposes if the placeholder functions were implemented.

Security Implications:

Unauthorized File Access: The code could be used to read sensitive information if executed with high privileges. It demonstrates how an attacker might gain access to user data on a system.

Potential for Expansion: The network simulation function indicates that the program could be extended to include network-related attacks, such as sending data to an external server.

Use Case and Risk:Educational or Demonstration Purposes: This code could be used for educational purposes to illustrate how unauthorized file access might be conducted or to demonstrate the structure of a potential attack.

Malicious Use: If adapted with real code in the network simulation function, it could become part of a more sophisticated attack, especially if combined with other malicious actions.`

const UploadDialog: React.FC<UploadDialogProps> = ({ onUpload }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };



  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    const savedApiKey = Cookies.get('api_key');
    if (!savedApiKey) {
      toast.error("api key not found");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', savedApiKey);


    try {
      // Show 'Uploading...' toast message
      toast.loading('Uploading...', { id: 'upload' });

      // API call for submission
      console.log("Before API Call");
      const response = await axios.post('http://localhost:8000/submit/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      // Remove 'Uploading...' toast and show 'Decompiling...' toast message
      toast.remove('upload');
      toast.loading('Decompiling...', { id: 'decompile' });

      // Wait for 2 seconds before transitioning to the next stage
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Remove 'Decompiling...' toast and show 'Generating report...' toast message
      toast.remove('decompile');
      toast.loading('Generating report...', { id: 'generateReport' });

      // Simulate additional processing time for generating report
      await new Promise(resolve => setTimeout(resolve, 8000));  // 8 seconds

      // Simulate final processing
      await onUpload({
        filename: file.name,
        filesize: file.size,
        report: response.data
      });

      // Remove 'Generating report...' toast and show 'Upload successful!' toast message
      toast.remove('generateReport');
      toast.success('Upload successful!');

      // Toggle modal or perform other final actions
      toggleModal();
    } catch (err) {
      console.log(err);
      setError('Upload failed. Please try again.');
      // Remove any existing toasts and show error toast if needed
      toast.remove('upload');
      toast.remove('decompile');
      toast.remove('generateReport');
      toast.error('Upload failed. Please try again.');
    } finally {
      // Ensure uploading state is updated
      setUploading(false);
    }

  };

  return (
    <div className='relative'>
      <button
        onClick={toggleModal}
        className="flex gap-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_3098_154395)">
            <path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_3098_154395">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Upload
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-60'>
          <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              onClick={toggleModal}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">

              <div className="flex items-center py-10 justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 0 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>

                    {fileName ? <p className="text-indigo-500 text-sm mt-2">{fileName}</p> : <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>}
                    <p className="text-xs text-gray-500 dark:text-gray-400">.out .exe </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleUpload}
                  type="button"
                  disabled={uploading || !file}
                  className={`flex gap-2 text-white ${uploading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:ring-4 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400`}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-700 text-sm px-5 py-2.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDialog;
