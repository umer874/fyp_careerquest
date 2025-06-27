// components/common/jobCard.tsx
"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import Image, { StaticImageData } from "next/image";
import CustomButton from "components/common/customButton";
import Link from "next/link";
import moment from "moment";
import { routeConstant } from "routes/constants";
import { useSelector } from "react-redux";
import { Icons, Images } from "assets";
import ProgressBar from "components/common/progressBar";

type JobCardProps = {
  id: string | any;
  icon: StaticImageData | string;
  timeStamp: string;
  title: string;
  company: string;
  desc: string;
  onButtonClick?: () => void;
  matchPercentage?: number;
  requiredSkills?: string[];
  userSkills?: string[];
};

const JobCard = ({
  id,
  icon,
  timeStamp,
  title,
  company,
  desc,
  onButtonClick,
  matchPercentage,
  requiredSkills = [],
  userSkills = [],
}: JobCardProps) => {
  const { auth } = useSelector((state: any) => state.root);
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (onButtonClick) {
      onButtonClick();
    }
  };

  // Calculate match percentage if not provided
  const calculatedMatch = matchPercentage ?? (() => {
    if (!requiredSkills.length) return 0;
    const matchedSkills = requiredSkills.filter(skill => 
      userSkills.includes(skill)
    );
    return Math.round((matchedSkills.length / requiredSkills.length) * 100);
  })();

  // Determine match level color
  const matchColor = calculatedMatch > 75 ? "bg-green-500" : 
                     calculatedMatch > 50 ? "bg-blue-500" : "bg-yellow-500";

  return (
    <Link href={routeConstant.jobDetail.path.replace(":id", id)}>
      <div className={classNames(styles.eventItem)}>
        <div
          className={classNames(
            styles.cardContent,
            "flex sm:flex-row flex-col sm:justify-between items-center"
          )}
        >
          <div className="flex items-center gap-3">
            <Image width={68} height={68} src={icon} alt="company-logo" />
            <div>
              <div className={classNames(styles.title, "flex items-start gap-2")}>
                <h6>{title}</h6>
                <span>{moment(timeStamp).fromNow()}</span>
              </div>
              <p className={classNames(styles.company)}> {company}</p>
            </div>
          </div>
          <div className={classNames(styles.buttonContainer, "sm:mt-0 mt-4")}>
            <CustomButton
              title="Apply Now"
              containerStyle="w-full"
              onClick={handleButtonClick}
            />
          </div>
        </div>
        
        {/* Skill Match Indicator */}
        <div className="mt-4 px-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Skill Match</span>
            <span className="text-sm font-bold text-gray-900">{calculatedMatch}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${matchColor}`}
              style={{ width: `${calculatedMatch}%` }}
            ></div>
          </div>
        </div>
        
        {/* Required Skills */}
        {requiredSkills.length > 0 && (
          <div className="mt-4 px-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Key Skills:</p>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill, idx) => {
                const isMatched = userSkills.includes(skill);
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
        )}
        
        <div className={classNames(styles.itemContent, "mt-4")}>
          <p>{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;