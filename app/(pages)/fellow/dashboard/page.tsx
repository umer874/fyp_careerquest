"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import Image from "next/image";
import { jobData } from "utils/constants";
import CustomButton from "components/common/customButton";
import ProgressBar from "components/common/progressBar";
import VacancyStatsChart from "components/common/vacancyStatsChart";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetUserWithSkills } from "services/user";
import { updateUserSkills } from "redux/reducers/authSlice";

const Dashbaord = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.root.auth);
  const router = useRouter();

  useEffect(() => {
  console.log("User object:", user); // Add this to inspect the user object
}, [user]);

  useEffect(() => {
    const loadUserSkills = async () => {
      if (!user?._id) return;

      try {
        const response = await GetUserWithSkills(user._id);
        dispatch(updateUserSkills({
          skills: response.data.user?.skills || []
        }));
      } catch (error) {
        console.error("Failed to fetch user skills:", error);
      }
    };

    loadUserSkills();
  }, [user?._id, dispatch]);

  const calculateSkillProgress = (skill: string) => {
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

  return (
    <div className={classNames(styles.customContainer)}>
      <div className={classNames(styles.pageDetailWrapper)}>
        <div className="grid md:grid-cols-[60%_40%] grid-cols-1 gap-8">
          {/* Left Column */}
          <div className={classNames(styles.box)}>
            {/* Stats Cards */}
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-7 sm:gap-5 xs:gap-4 gap-3">
              {[
                { value: 43, label: "Application Sent", icon: <Icons.Home />, color: "" },
                { value: 27, label: "Interviews sheduled", icon: <Icons.Calendar />, color: "#F39C12" },
                { value: "10k", label: "Profile Viewed", icon: <Icons.Usermain />, color: "#28A745" }
              ].map((stat, index) => (
                <div key={index} className={classNames(styles.stepItem, "flex items-center")}>
                  <div className={classNames(styles.itemContent)}>
                    <h2 style={{ color: stat.color }}>{stat.value}</h2>
                    <p>{stat.label}</p>
                  </div>
                  <div className={classNames(styles.iconContainer)}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className={classNames(styles.chart, "mt-8")}>
              <VacancyStatsChart />
            </div>
          </div>

          {/* Right Column - User Profile */}
          <div className={classNames(styles.user)}>
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
                    title="Take the Test!"
                    containerStyle="bg-blue maxHeighted_btn"
                    onClick={() => router.push('/test')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className={classNames(styles.jobs, "mt-8")}>
          <h4>Recommended Jobs</h4>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 pt-6">
            {jobData.map((job, index) => (
              <div key={index} className={classNames(styles.stepItem)}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className={classNames(styles.iconContainer, "flex-shrink-0")}>
                    <Image
                      src={job.image.src}
                      alt={job.title}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className={classNames(styles.itemContent, "flex-grow")}>
                    <h6>{job.title}</h6>
                    <p>{job.company}</p>
                  </div>
                  <CustomButton
                    title={job.applyButton}
                    containerStyle="bg-blue maxHeighted_btn w-full sm:w-auto"
                  />
                </div>

                <div className={classNames(styles.line, "my-4")} />

                <div className={classNames(styles.description, "flex flex-col gap-4")}>
                  <div className="flex gap-2 items-center">
                    <Icons.Money className="flex-shrink-0" />
                    <span>{job.salaryRange}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Icons.LocationPin className="flex-shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[...job.jobType, ...job.experience, ...job.workMode].map((item, idx) => (
                      <button
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashbaord;