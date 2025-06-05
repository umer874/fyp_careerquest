"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import Image from "next/image";
import { jobData } from "utils/constants";
import CustomInput from "components/common/customInput";
import CustomPhoneInput from "components/common/customPhoneInput";
import CustomTextArea from "components/common/customTextArea";
import CustomButton from "components/common/customButton";
import ProgressBar from "components/common/progressBar";
import VacancyStatsChart from "components/common/vacancyStatsChart";
import RatingLine from "components/common/customRatingLine";
import { ContactUsService } from "services/general";
import { toastMessage } from "components/common/toast";
import { handleErrors } from "utils/helper";
import { ContactVS } from "utils/validation";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const Dashbaord = () => {




  return (
    <div className={classNames(styles.customContainer)}>
      <div className={classNames(styles.pageDetailWrapper)}>

        <div className="grid md:grid-cols-[60%_40%] grid-cols-1 gap-8">



          <div className={classNames(styles.box)}>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-7 sm:gap-5 xs:gap-4 gap-3">

              <div className={classNames(styles.stepItem, "flex items-center")}>

                <div className={classNames(styles.itemContent, "")}>
                  <div>
                    <h2>43</h2>
                    <p>Application Sent</p>
                  </div>
                </div>
                <div className={classNames(styles.iconContainer)}>
                  <Icons.Home />
                </div>
              </div>

              <div className={classNames(styles.stepItem, "flex items-center")}>

                <div className={classNames(styles.itemContent, "")}>
                  <div>
                    <h2 style={{ "color": "#F39C12" }}>27</h2>
                    <p>Interviews Shedule</p>
                  </div>
                </div>

                <div className={classNames(styles.iconContainer)}>
                  <Icons.Calendar />
                </div>
              </div>

              <div className={classNames(styles.stepItem, "flex items-center")}>

                <div className={classNames(styles.itemContent, "")}>
                  <div>
                    <h2 style={{ "color": "#28A745" }}>10k</h2>
                    <p>Profile Viewed</p>
                  </div>
                </div>
                <div className={classNames(styles.iconContainer)}>
                  <Icons.User />
                </div>
              </div>

            </div>

            <div className={classNames(styles.chart)}>
              <VacancyStatsChart />
            </div>

          </div>

          <div className={classNames(styles.user, "")}>
            <div className={classNames(styles.main)}>
              <div className={classNames(styles.box, "flex gap-6 items-center")}>
                <Image src={Images.User1} alt="user icon" />
                <div className={classNames(styles.text, "flex flex-col gap-3")}>
                  <h6>Muhammad Anas</h6>
                  <p style={{ "color": "#0092D6" }}>ReactJS Developer</p>
                  <div className={classNames("flex gap-1 items-center")}>
                    <Icons.LocationPin />
                    <span className="whitespace-nowrap text-xs">Lahore, Pakistan</span>
                  </div>

                </div>
                <CustomButton
                  title="Update Profile"
                  containerStyle="bg-blue maxHeighted_btn"
                />
              </div>

              <div className="flex gap-14 items-center">

                <div className={classNames(styles.content, "flex flex-col gap-4")}>


                  <h5>Skills</h5>

                  <div className="flex flex-col gap-2">
                    <ProgressBar percent={90} />
                    <p>Programming & Development</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <ProgressBar percent={73} style={{ "color": "#F39C12" }} />
                    <p>Data Science & AI</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <ProgressBar percent={45} style={{ "color": "#28A745" }} />
                    <p>UI / UX</p>
                  </div>
                </div>
                <Image src={Images.Gragh} alt="gragh" className="w-45 h-55" />
              </div>


              <div className={classNames(styles.text, "flex flex-col gap-2")}>
                <h5>Boost Your Career with a Quick Skill Test! </h5>

                <p>Evaluate your skills and get personalized career
                  recommendations to grow in the IT sector.</p>

                <div className="flex gap-6 pt-4 items-center">
                  <span style={{ "color": "#53BE33" }}>Discover your strengths today!</span>
                  <CustomButton
                    title="Take the Test!"
                    containerStyle="bg-blue maxHeighted_btn"
                  />
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>

        </div>

        <div className={classNames(styles.jobs)}>
          <h4 className="pt-6">Recommended Jobs</h4>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 pt-6">
            {jobData.map((job, index) => (
              <div key={index} className={classNames(styles.stepItem, "items-center")}>
                <div className="flex items-center gap-4">
                  <div className={classNames(styles.iconContainer)}>
                    <Image
                      src={job.image.src}
                      alt={job.title}
                      width={job.image.width}
                      height={job.image.height}
                    />
                  </div>
                  <div className={classNames(styles.itemContent, "items-center mb-4")}>
                    <div>
                      <h6>{job.title}</h6>
                      <p>{job.company}</p>
                    </div>
                  </div>
                  <CustomButton
                    title={job.applyButton}
                    containerStyle="bg-blue maxHeighted_btn"
                  />
                </div>
                <div className={classNames(styles.line, "mt-6")}></div>
                <div className={classNames(styles.description, "flex flex-col gap-6 pt-6")}>
                  <div className="flex gap-4">
                    <Icons.Money />
                    <span>{job.salaryRange}</span>
                  </div>
                  <div className="flex gap-4">
                    <Icons.LocationPin />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex gap-4">
                    {job.jobType.map((type, idx) => (
                      <button key={idx}>{type}</button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {job.experience.map((exp, idx) => (
                      <button key={idx}>{exp}</button>
                    ))}
                    {job.workMode.map((mode, idx) => (
                      <button key={idx}>{mode}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbaord;
