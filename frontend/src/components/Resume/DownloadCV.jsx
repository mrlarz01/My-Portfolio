import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiDownload } from 'react-icons/hi';
import axios from 'axios';
import './DownloadCV.scss';

const DownloadCV = ({ cvFile }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cvFile) {
      alert('Resume PDF is not available at the moment');
      return;
    }

    setDownloading(true);

    try {
      // Fetch the PDF file as a blob
      const response = await axios.get('/api/resume/download', {
        responseType: 'blob',
        timeout: 30000, // 30 second timeout
      });

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Download error:', error);
      console.error('Error details:', error.response);
      
      // Fallback: try direct link
      if (error.response?.status === 404) {
        alert('Resume PDF not found. Please contact the administrator.');
      } else {
        // Try alternative download method
        try {
          const link = document.createElement('a');
          link.href = `${window.location.origin}/api/resume/download`;
          link.download = 'resume.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (fallbackError) {
          alert('Failed to download resume. Please try again or contact support.');
        }
      }
    } finally {
      setDownloading(false);
    }
  };

  // Don't show the section if no CV file is available
  if (!cvFile) {
    return null;
  }

  return (
    <motion.section
      ref={ref}
      className="download-cv"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="download-content">
        <h2>Download My Resume</h2>
        <p>Get a PDF version of my resume</p>
        <motion.button
          className="download-button"
          onClick={handleDownload}
          disabled={downloading}
          whileHover={{ scale: downloading ? 1 : 1.05 }}
          whileTap={{ scale: downloading ? 1 : 0.95 }}
        >
          <HiDownload />
          {downloading ? 'Downloading...' : 'Download CV'}
        </motion.button>
      </div>
    </motion.section>
  );
};

export default DownloadCV;

