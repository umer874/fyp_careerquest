"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetUserWithSkills } from "services/user";
import { updateUserSkills } from "redux/reducers/authSlice";
import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import Image from "next/image";
//import { jobData } from "utils/constants";
import CustomButton from "components/common/customButton";
import ProgressBar from "components/common/progressBar";
import VacancyStatsChart from "components/common/vacancyStatsChart";
import { useRouter } from "next/navigation";
import { initSocket } from "services/socket";
import { getRecommendedJobs } from "services/jobRecommendation";
import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2"; // Changed from Line to Bar
import { ChartOptions } from 'chart.js';
import { jobData } from "utils/jobData";
import {
  Chart as ChartJS,
  BarElement, // New imports for bar chart
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

// Add this at the top of your file (or in a types file)
type SkillType = {
  name: string;
  currentLevel: number;
  improvementRate: number;
  lastAssessed?: Date;
};

type SkillChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

interface User {
  _id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_asset?: string | null;
  skills: string[];
  has_taken_test?: boolean;
  careerMatch: string;
}

type CareerKey =
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'devops'
  | 'dataScientist'
  | 'aiEngineer'
  | 'cloudArchitect'
  | 'securityEngineer'
  | 'mobileDeveloper'
  | 'qaEngineer'
  | 'databaseAdmin'
  | 'technicalManager';

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  salaryRange: string;
  location: string;
  jobType: string[];
  experience: string[];
  workMode: string[];
  requiredSkills: string[];
  isRemote: boolean;
  careerRoles?: string[];
  matchPercentage?: number;
  preferredCareer?: CareerKey;
  relatedCareers?: CareerKey[];
  matchedSkills?: string[];
  experienceLevel?: 'entry' | 'mid' | 'senior';
}


const DashboardClient = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: any) => state.root.auth);
  const router = useRouter();
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    console.log("User object:", user); // Add this to inspect the user object
  }, [user]);


  useEffect(() => {
    console.log("User career match:", user?.careerMatch);
    console.log("User skills:", user?.skills);
    console.log("Job data:", jobData);
    console.log("Recommended jobs:", recommendedJobs);
  }, [recommendedJobs]);




  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/login");
    }
    // REMOVED: else if (user && !user.has_taken_test) {
    //   router.replace("/test");
    // }
  }, [isLoggedIn, user]);

  const calculateSkillProgress = (skill: string): number => {
    const skillWeights: Record<string, number> = {
      "Programming & Development": 90,
      "Data Science & AI": 73,
      "UI/UX Design": 45,
      "Frontend Development": 85,
      "Backend Development": 75,
      "DevOps": 65
    };
    return skillWeights[skill] || 70;
  };

  const calculateImprovementRate = (skill: string): number => {
    const improvementRates: Record<string, number> = {
      "Programming & Development": 15,
      "Data Science & AI": 22,
      "UI/UX Design": 8,
      "Frontend Development": 18,
      "Backend Development": 12,
      "DevOps": 9
    };
    return improvementRates[skill] || 10;
  };

  const prepareSkillChartData = (skills: string[]): SkillChartData => {
    return {
      labels: skills,
      datasets: [
        {
          label: "Current Skill Level (%)",
          data: skills.map(skill => calculateSkillProgress(skill)),
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Improvement Rate (%)",
          data: skills.map(skill => calculateImprovementRate(skill)),
          backgroundColor: "rgba(75, 192, 192, 0.7)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        }
      ]
    };
  };

  // Usage in your component:
  //const skillProgressData = prepareSkillChartData(user?.skills || []);

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.x}%`
        }
      }
    }
  };

  // In DashboardClient component
  // DashboardClient component
  useEffect(() => {
    if (user?.skills?.length > 0) {
      const recommended = getRecommendedJobs(
        user.careerMatch, // Can be undefined
        user.skills,
        jobData
      );
      setRecommendedJobs(recommended);
    }
  }, [user?.careerMatch, user?.skills]);

  useEffect(() => {
    const loadUserSkills = async () => {
      if (!user?.id) return;

      try {
        const response = await GetUserWithSkills(user.id);
        dispatch(updateUserSkills({
          skills: response.data.user?.skills || []
        }));
      } catch (error) {
        console.error("Failed to fetch user skills:", error);
      }
    };

    loadUserSkills();
  }, [user?.id, dispatch]);


  const skillProgressData = useMemo(() => {
    return prepareSkillChartData(user?.skills || []);
  }, [user?.skills]);


  return (
    <div className={classNames(styles.customContainer)}>
      <div className={classNames(styles.pageDetailWrapper)}>
        <div className="grid md:grid-cols-[60%_40%] grid-cols-1 gap-8">
          {/* Left Column */}
          <div className={classNames(styles.box)}>
            <div className={classNames(styles.chart, "")}>
              <div className="flex justify-between items-center mb-4">
                <h5>Skill Progress</h5>
                <div className="flex items-center gap-2">
                  <span className="flex items-center">
                    <div className={styles.legendCurrent}></div>
                    Current Level
                  </span>
                  <span className="flex items-center">
                    <div className={styles.legendImprovement}></div>
                    Improvement
                  </span>
                </div>
              </div>

              {user?.skills?.length > 0 ? (
                <Bar data={skillProgressData} options={chartOptions} />
              ) : (
                <div className="text-center py-8">
                  <p>No skills data available</p>
                  <CustomButton
                    title="Take Skills Assessment"
                    containerStyle="mt-4 bg-blue"
                    onClick={() => router.push('/test')}
                  />
                </div>
              )}

              {/* Skill Insights Section */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user?.skills?.slice(0, 4).map((skill: string, index: number) => (
                  <div key={index} className={classNames(styles.skillInsightCard)}>
                    <h6>{skill}</h6>
                    <div className="flex justify-between mt-2">
                      <span>Level: {calculateSkillProgress(skill)}%</span>
                      <span className={styles.improvementRate}>
                        +{calculateImprovementRate(skill)}%
                        <Icons.ChevUp className="ml-1" />
                      </span>
                    </div>
                    <div className="mt-2">
                      <ProgressBar
                        percent={calculateSkillProgress(skill)}
                        style={{
                          backgroundColor: index % 2 === 0 ? "#28A745" : "#0092D6"
                        }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Last improved: {["2 days", "1 week", "3 days", "2 weeks"][index]} ago
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - User Profile */}
          <div className={classNames(styles.user, "mt-8")}>
            <div className={classNames(styles.main)}>
              {/* Profile Header */}
              <div className={classNames(styles.box, "flex flex-col sm:flex-row gap-6 items-start sm:items-center")}>
                <Image
                  width={70}
                  height={70}
                  src={Images.DefaultAvatar}
                  alt="user icon"
                  className="flex-shrink-0"
                />
                <div className={classNames(styles.text, "flex flex-col gap-3 flex-grow")}>
                  <h6>{user?.first_name} {user?.last_name}</h6>
                  <p className="text-blue">ReactJS Developer</p>
                  <div className="flex gap-1 items-center">
                    <Icons.LocationPin />
                    <span className="text-xs">Lahore, Pakistan</span>
                  </div>
                </div>
                <CustomButton
                  title="Update Profile"
                  containerStyle="bg-blue maxHeighted_btn w-full sm:w-auto"
                />
              </div>

              {/* Skills Section */}
              <div className="flex flex-col lg:flex-row gap-8 items-start mt-8 items-center">
                <div className={classNames(styles.skillSection, "flex flex-col gap-4 w-full")}>
                  <h5>Skills</h5>

                  {user?.skills?.length > 0 ? (
                    user.skills.map((skill: string, index: number) => (
                      <div key={index} className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{skill}</span>
                          <span className="text-xs text-gray-500">{calculateSkillProgress(skill)}%</span>
                        </div>
                        <ProgressBar
                          percent={calculateSkillProgress(skill)}
                          style={{
                            color: index === 0 ? "#28A745" :
                              index === 1 ? "#F39C12" :
                                "#0092D6"
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col gap-2 w-full">
                      <ProgressBar percent={0} />
                      <p>No skills assessed yet</p>
                      <p className={styles.takeTestPrompt}>
                        Take the test to discover your skills!
                      </p>
                    </div>
                  )}
                </div>

                <Image
                  src={Images.Gragh}
                  alt="skill graph"
                  width={180}
                  height={220}
                  className="hidden lg:block flex-shrink-0 pt-6"
                />
              </div>

              {/* CTA Section */}
              <div className={classNames(styles.text, "flex flex-col gap-2 mt-8")}>
                <h5>Boost Your Career with a Quick Skill Test!</h5>
                <p>Evaluate your skills and get personalized career recommendations to grow in the IT sector.</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center">
                  <span className="text-green-500">Discover your strengths today!</span>
                  <CustomButton
                    title={user?.has_taken_test ? "Retake Test" : "Take the Test!"}
                    containerStyle="bg-blue maxHeighted_btn"
                    onClick={() => router.push('/test')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Recommended Jobs Section */}
        <div className={classNames(styles.jobs, "mt-8")}>
          <h4 className="text-xl font-bold mb-4">Recommended Jobs</h4>

          {recommendedJobs.length > 0 ? (
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 pt-2">
              {recommendedJobs.map((job) => (
                <JobCard key={job._id} job={job} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Complete your skill assessment to get personalized job recommendations
              </p>
              <CustomButton
                title="Take Skills Assessment"
                containerStyle="mt-2 bg-blue"
                onClick={() => router.push('/test')}
              />
            </div>
          )}
        </div>
      </div>

    </div>

  );
};

//const { isLoggedIn, user } = useSelector((state: any) => state.root.auth);

// components/JobCard.tsx
// JobCard component
// components/JobCard.tsx


interface JobCardProps {
  job: Job;
  user: any;
}

const JobCard = ({ job, user }: JobCardProps) => {
  const router = useRouter();
  
  // Calculate match percentage
  const matchedSkills = job.requiredSkills?.filter(skill => 
    user?.skills?.includes(skill))
  const matchPercentage = matchedSkills?.length && job.requiredSkills?.length
    ? Math.round((matchedSkills.length / job.requiredSkills.length) * 100)
    : 0;
  
  // Determine match level color
  const matchColor = matchPercentage > 75 ? "bg-green-500" : 
                     matchPercentage > 50 ? "bg-blue-500" : "bg-yellow-500";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-300">
      <div className="p-5">
        {/* Career match badge */}
        {job.preferredCareer === user?.careerMatch && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-flex items-center mb-3">
            <Icons.Star className="mr-1" />
            Perfect Career Match
          </div>
        )}
        
        {/* Job header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
            <p className="text-blue-600 font-medium">{job.company}</p>
          </div>
          {job.isRemote && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Remote
            </span>
          )}
        </div>
        
        {/* Salary and location */}
        <div className="flex items-center mt-3 text-sm">
          <Icons.Money className="text-gray-500 mr-2" />
          <span className="text-gray-700 font-medium">{job.salaryRange}</span>
          <Icons.LocationPin className="text-gray-500 ml-4 mr-2" />
          <span className="text-gray-600">{job.location}</span>
        </div>
        
        {/* Experience level */}
        <div className="mt-2 flex items-center">
          <Icons.Experience  />
          <span className="text-gray-600 text-sm">
            {job.experienceLevel === 'entry' ? 'Entry Level' : 
             job.experienceLevel === 'mid' ? 'Mid Level' : 'Senior Level'}
          </span>
        </div>
        
        {/* Skill match indicator */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Skill Match</span>
            <span className="text-sm font-bold text-gray-900">{matchPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${matchColor}`}
              style={{ width: `${matchPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Required skills */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
          <div className="flex flex-wrap gap-2">
            {job.requiredSkills.map((skill, idx) => {
              const isMatched = user?.skills?.includes(skill);
              return (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isMatched 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}
                >
                  {skill}
                  {isMatched && (
                    <Icons.CheckDouble className="ml-1 inline h-3 w-3 text-green-500" />
                  )}
                </span>
              );
            })}
          </div>
        </div>
        
        {/* Action buttons */}
        {/* <div className="mt-6 flex gap-3">
          <button
            onClick={() => router.push(`/jobs/${job._id}`)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5"
          >
            View Details
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Icons.Bookmark  />
          </button>
        </div> */}
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {job.jobType.join(', ')} • {job.experience.join(', ')}
        </span>
        <span className="text-xs text-gray-500">
          Posted 2 days ago
        </span>
      </div>
    </div>
  );
};



export default DashboardClient;
