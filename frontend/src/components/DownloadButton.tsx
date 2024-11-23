'use client';
import axios from 'axios';
import React from 'react';



interface DownloadButtonProps {
  filename: string
  report: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ report, filename }) => {
  const handleDownload = async () => {
    try {
      console.log('before API call');

      const response = await axios.post('/api/generate-pdf', {
        variableName: report
      }, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        // Create a URL for the PDF Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}-report.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('An error occurred while generating the PDF', error);
    }
  };


  return (
    <button
      onClick={handleDownload}
      className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none sm:mx-2"
    >
      Download
    </button>
  );
};

export default DownloadButton;
