"use client";

import { Icons } from "assets";
import classNames from "classnames";
import CustomButton from "components/common/customButton";
import NoContentCard from "components/common/noContentCard";
import PortfolioCard from "components/fellow/portfolioCard";
import useUpdateToken from "hooks/useUpdatedToken";
import { RefreshToken } from "_shared/types/auth";
import PortfolioModal from "modals/portfolioModal";
import moment from "moment";
import { useRouter } from "next13-progressbar";
import { toastMessage } from "components/common/toast";
import { useState } from "react";
import { useSelector } from "react-redux";
import { routeConstant } from "routes/constants";
import { GetPortfoliosService } from "services/portfolio";
import { PortfolioTabs } from "utils/constants";
import styles from "../style.module.scss";
import { useEffect } from "react";
import { Meta } from "_shared/types/pagination";
interface PortfolioProps {
  list: any[];
  updatedToken: RefreshToken;
  meta: Meta;
}

const PortfolioList = () => {

  const [activeTab, setActiveTab] = useState<'resume' | 'interview'>('resume');

  // Resume/CV preparation content
  const resumeSections = [
    {
      title: "Professional Summary",
      tips: [
        "Keep it concise (3-4 sentences)",
        "Highlight your key skills and experiences",
        "Tailor it to the specific job you're applying for",
        "Include relevant achievements and metrics"
      ]
    },
    {
      title: "Work Experience",
      tips: [
        "List in reverse chronological order",
        "Use action verbs: 'Developed', 'Managed', 'Implemented'",
        "Quantify achievements with numbers",
        "Focus on responsibilities and results"
      ]
    },
    {
      title: "Skills Section",
      tips: [
        "Categorize skills (Technical, Soft, Languages)",
        "Match skills to job requirements",
        "Include industry-specific keywords",
        "Show proficiency levels where appropriate"
      ]
    },
    {
      title: "Education",
      tips: [
        "Include degree, institution, and graduation date",
        "Add relevant coursework for recent graduates",
        "Include academic achievements (GPA 3.5+)",
        "Add certifications and professional development"
      ]
    }
  ];

  // Interview preparation content
  const interviewSections = [
    {
      title: "Before the Interview",
      tips: [
        "Research the company and role thoroughly",
        "Review common interview questions",
        "Prepare 3-5 questions to ask the interviewer",
        "Plan your route and test technology for virtual interviews"
      ]
    },
    {
      title: "During the Interview",
      tips: [
        "Use the STAR method for behavioral questions",
        "Maintain eye contact and positive body language",
        "Be concise but thorough in responses",
        "Show enthusiasm for the role and company"
      ]
    },
    {
      title: "Technical Interviews",
      tips: [
        "Practice coding problems on platforms like LeetCode",
        "Explain your thought process out loud",
        "Ask clarifying questions about problems",
        "Review fundamental CS concepts"
      ]
    },
    {
      title: "After the Interview",
      tips: [
        "Send a thank-you email within 24 hours",
        "Reflect on what went well and what to improve",
        "Follow up if you haven't heard back in the timeline provided",
        "Continue applying to other positions while waiting"
      ]
    }
  ];




  return (
    <div className={classNames(styles.customContainer, "min-h-screen ")}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Career Preparation Toolkit
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to craft an outstanding resume and ace your next interview
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl shadow-md p-1">
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-8 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${activeTab === 'resume'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-700 hover:text-indigo-700'
                }`}
            >
              Resume/CV Builder
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-8 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${activeTab === 'interview'
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'text-gray-700 hover:text-cyan-700'
                }`}
            >
              Interview Prep
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Resume Builder Section */}
          {activeTab === 'resume' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              <div className="lg:col-span-1 bg-indigo-50 rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <DocumentIcon />
                  </div>
                  <h2 className="text-3xl font-bold text-indigo-900">Resume Builder</h2>
                </div>

                <p className="text-gray-700 mb-6">
                  Create a professional resume that stands out to employers. Follow these guidelines to highlight your skills and experience effectively.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <h3 className="font-bold text-indigo-800 mb-2">Resume Templates</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Modern', 'Professional', 'Creative', 'Minimalist'].map((style) => (
                        <button
                          key={style}
                          className="py-2 px-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors"
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center">
                    <Icons.ChevDown className="mr-2" />
                    Download PDF Template
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-6">
                  {resumeSections.map((section, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                            <Icons.CheckDouble className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Interview Prep Section */}
          {activeTab === 'interview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              <div className="lg:col-span-1 bg-cyan-50 rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                    <ChatIcon />
                  </div>
                  <h2 className="text-3xl font-bold text-cyan-900">Interview Prep</h2>
                </div>

                <p className="text-gray-700 mb-6">
                  Master your next interview with our comprehensive guide. Practice common questions and learn strategies to impress employers.
                </p>

                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-lg border border-cyan-200">
                    <h3 className="font-bold text-cyan-800 mb-3">Mock Interview</h3>
                    <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-90 text-white font-medium rounded-lg transition-opacity">
                      Start Practice Session
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-cyan-200">
                    <h3 className="font-bold text-cyan-800 mb-4 text-center text-lg">Common Interview Questions</h3>
                    <ul className="space-y-3">
                      {[
                        "Tell me about yourself",
                        "What are your strengths?",
                        "Where do you see yourself in 5 years?",
                        "Why should we hire you?",

                      ].map((q, i) => (
                        <li key={i} className="flex items-start">
                          <span className="flex-shrink-0 h-5 w-5 text-cyan-500 mr-3 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-700 align-baseline">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-6">
                  {interviewSections.map((section, index) => (
                    <div
                      key={index}
                      className={`border rounded-xl p-6 transition-shadow hover:shadow-md ${section.title === 'Technical Interviews'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-white border-gray-200'
                        }`}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${section.title === 'Technical Interviews'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-cyan-100 text-cyan-800'
                          }`}>
                          {index + 1}
                        </span>
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                             <span className="flex-shrink-0 h-5 w-5 text-cyan-500 mr-3 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Portfolio Building", icon: <PortfolioIcon />, color: "bg-purple-100" },
              { title: "Networking Guide", icon: <NetworkIcon />, color: "bg-emerald-100" },
              { title: "Career Roadmaps", icon: <RoadmapIcon />, color: "bg-rose-100" }
            ].map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`${resource.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">
                  Essential guides to advance your career beyond resumes and interviews
                </p>
                <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                  Explore Resources →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const QuestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PortfolioIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const RoadmapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);


export default PortfolioList;
