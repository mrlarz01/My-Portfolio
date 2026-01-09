import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ResumeSummary from '../components/Resume/ResumeSummary';
import EducationTimeline from '../components/Resume/EducationTimeline';
import ExperienceTimeline from '../components/Resume/ExperienceTimeline';
import SkillsSection from '../components/Resume/SkillsSection';
import SoftwareSkills from '../components/Resume/SoftwareSkills';
import Certifications from '../components/Resume/Certifications';
import DownloadCV from '../components/Resume/DownloadCV';
import './ResumePage.scss';

const ResumePage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/resume');
        setResumeData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load resume data');
        console.error('Error fetching resume:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="resume-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="resume-header section">
          <div className="container">
            <h1 className="page-title">Resume</h1>
            <p className="page-subtitle">My education, experience, and skills</p>
          </div>
        </div>
        <div className="resume-content section">
          <div className="container">
            <div className="loading-state">Loading resume...</div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error || !resumeData) {
    return (
      <motion.div
        className="resume-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="resume-header section">
          <div className="container">
            <h1 className="page-title">Resume</h1>
            <p className="page-subtitle">My education, experience, and skills</p>
          </div>
        </div>
        <div className="resume-content section">
          <div className="container">
            <div className="error-state">{error || 'Resume data not available'}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="resume-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="resume-header section">
        <div className="container">
          <h1 className="page-title">Resume</h1>
          <p className="page-subtitle">My education, experience, and skills</p>
        </div>
      </div>

      <div className="resume-content section">
        <div className="container">
          <ResumeSummary summary={resumeData.summary} />
          <EducationTimeline education={resumeData.education} />
          <ExperienceTimeline experience={resumeData.experience} />
          <SkillsSection skills={resumeData.skills} />
          <SoftwareSkills software={resumeData.software} />
          <Certifications certifications={resumeData.certifications} />
          <DownloadCV cvFile={resumeData.cvFile} />
        </div>
      </div>
    </motion.div>
  );
};

export default ResumePage;

