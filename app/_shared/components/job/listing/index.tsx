// app/(fellow)/jobs/listing.tsx
"use client";

import React, { Fragment, useState,useEffect } from "react";
import JobsCTA from "../cta";
import CustomButton from "components/common/customButton";
import classNames from "classnames";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Images } from "assets";
import { routeConstant } from "routes/constants";
import JobCard from "components/common/jobCard";
import { getRecommendedJobs } from "services/jobRecommendation";
import { jobData } from "utils/jobData";


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

const JobsListing = () => {
  const router = useRouter();
  const {
    auth: { user, isLoggedIn },
  } = useSelector((state: any) => state.root);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);


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


  return (
    <>

      {recommendedJobs.length > 0 ? (
        recommendedJobs.map((job: any, index: number) => (
          <Fragment key={job?.id}>
            <div className="md:mb-4 mb-3">
              <JobCard
                id={job.id}
                icon={job?.company?.company_asset?.icon || Images.DefaultAvatar}
                timeStamp={job.created_at}
                title={job.title}
                company={job.company?.title}
                desc={job.position_overview}
                onButtonClick={() => {
                  if (!isLoggedIn) {
                    router.push(routeConstant.login.path);
                  }
                }}
                matchPercentage={job.matchPercentage}
                requiredSkills={job.requiredSkills}
                userSkills={user?.skills || []}
              />
            </div>
            {/* {(index + 1) % 3 === 0 && <JobsCTA />} */}
          </Fragment>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            No jobs found matching your skills
          </p>
          <CustomButton
            title="Take Skills Assessment"
            containerStyle="mt-2 bg-blue"
            onClick={() => router.push('/test')}
          />
        </div>
      )}
    </>
  );
};

export default JobsListing;