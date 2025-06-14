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

const Profile = () => {




  return (
    <div className={classNames(styles.customContainer)}>
      <div className={classNames(styles.pageDetailWrapper)}>
      <div className={classNames(styles.box)}>



<div className={classNames(styles.stepItem, "flex items-center gap-10")}>

  <div className={classNames(styles.iconContainer)}>
    <Image style={{"width":120,"height":120}} src={Images.DefaultAvatar} alt="user profile" />
  </div>

  <div className={classNames(styles.itemContent, "flex flex-col gap-4")}>

    <h6>Muhammad Anas</h6>
    <div className="flex gap-4">
      <div className="flex gap-1" >
        <Icons.UserProfileIcon />
        <span>ReactJS Developer</span>
      </div>
      <div className="flex gap-1" >
        <Icons.LocationPin />
        <span>Lahore, Pakistan</span>
      </div>
      <div className="flex gap-1" >
        <Icons.Email />
        <span>info@gmail.com</span>
      </div>
    </div>

    <div className="flex gap-6">

      <div className={classNames(styles.stepItem, "flex items-center gap-6")}>


        <Icons.Reward />


        <div className={classNames(styles.itemContent, "flex flex-col gap-4")}>

          <h3>10</h3>
          <span>Total Skills Aquired</span>
        </div>

      </div>

      <div className={classNames(styles.stepItem, "flex items-center gap-6")}>


        <Icons.Star />


        <div className={classNames(styles.itemContent, "flex flex-col gap-4")}>

          <h3>90%</h3>
          <span>Highest Proficiency</span>
        </div>

      </div>

      <div className={classNames(styles.stepItem, "flex items-center gap-6")}>


        <Icons.Bar />


        <div className={classNames(styles.itemContent, "flex flex-col gap-4")}>

          <h3>5</h3>
          <span>Assessments Taken</span>
        </div>

      </div>


    </div>

  </div>

  <div className={classNames(styles.progress, "flex gap-4")}>
    <div className="flex flex-col gap-2">
      <h6>Progress</h6>
      <div className="flex">
        <Icons.Maximize />
        <span style={{ "color": "#3BDA58" }}>+3.50%</span>
      </div>
    </div>
    <div className={classNames(styles.imageContainer)}>
      <Image src={Images.Chart} alt="chart" />
    </div>
  </div>

</div>

<div className="grid lg:grid-cols-3 sm:grid-cols-2  lg:grid-cols-[30%_35%_30%] grid-cols-1 lg:gap-7 sm:gap-5 xs:gap-4 gap-3 pt-8">

  <div className={classNames(styles.stepItem, "flex items-center gap-10")}>

    <div className={classNames(styles.content, "flex flex-col gap-4")}>


      <h4>Skills</h4>

      <div className="flex flex-col gap-6 pl-6">
        <Image src={Images.Gragh} alt="gragh" className="w-45 h-55" />

        <div className="flex flex-col gap-2 items-center">
          <ProgressBar percent={90} />
          <p>Programming & Development</p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <ProgressBar percent={73} style={{ color: "#F39C12" }} />
          <p>Data Science & AI</p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <ProgressBar percent={45} style={{ color: "#28A745" }} />
          <p>UI / UX</p>
        </div>
      </div>

    </div>


  </div>

  <div className={classNames(styles.stepItem, "flex flex-col gap-4")}>


    <h4>About Me</h4>
    <p>As a fervent ReactJS Developer with a robust command of JavaScript, I am committed to architecting
      sophisticated, dynamic, and intuitively engaging web applications. My proficiencies extend to engineering
      scalable systems, fine-tuning performance metrics, and seamlessly integrating avant-garde AI functionalities
      to elevate user experiences. </p>

    <h4 className="pt-4">Contact</h4>

    <div className="flex items-center gap-6">
      <Icons.PhoneIcon />
      <div className={classNames(styles.itemContent, "flex flex-col pt-4 gap-4")}>

        <h6>Phone</h6>
        <span>+92-3121988299</span>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <Icons.EmailBold />
      <div className={classNames(styles.itemContent, "flex flex-col pt-4 gap-4")}>

        <h6>Email</h6>
        <span>anashamid992@gmail.com</span>
      </div>
    </div>

  </div>

  <div className={classNames(styles.stepItem, "flex items-center")}>

    <div className="flex flex-col gap-10 pb-12">
      <h4 className="pb-8">Socials</h4>
      <div className="flex items-center gap-3">

        <button style={{ background: "rgba(221, 230, 252, 0.6)" }} className=""
        >
          <Icons.Facebook />
        </button>

        <div>
          <span style={{ background: "rgba(221, 230, 252, 0.6)" }}
            className={classNames(styles.link, "")}>/anas.hamid.165</span>
        </div>
      </div>
      <div className="flex items-center gap-3">

        <button style={{ background: "rgba(201, 191, 255, 0.3)" }}
        >
          <Icons.LinkedIn />
        </button>

        <div>
          <span style={{ background: "rgba(201, 191, 255, 0.3)" }}
            className={classNames(styles.link)}>/anas.hamid.380</span>
        </div>
      </div>
      <div className="flex items-center gap-3">

        <button style={{ background: "rgba(78, 49, 69, 0.15)" }}>
          <Icons.Github />
        </button>

        <div>
          <span style={{ background: "rgba(78, 49, 69, 0.15)" }}
            className={classNames(styles.link)}>/anas.hamid.559</span>
        </div>
      </div>
      <div className="flex items-center gap-3">

        <button style={{ background: "rgba(252, 186, 190, 0.4)" }}
        >
          <Icons.Youtube />
        </button>

        <div>
          <span style={{ background: "rgba(252, 186, 190, 0.4)" }}
            className={classNames(styles.link)}>/anas.hamid.862</span>
        </div>
      </div>
    </div>
  </div>


</div>

<div className="grid lg:grid-cols-2 sm:grid-cols-1  lg:grid-cols-[40%_57%] grid-cols-1 lg:gap-7 sm:gap-5 xs:gap-4 gap-3 pt-8">

  <div className={classNames(styles.stepItem, "flex items-center gap-4")}>

    <div className={classNames(styles.content, "flex flex-col gap-2")}>
      <h4>Technical Proficiencies</h4>
      <div className="flex flex-col">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2  lg:grid-cols-[41%_41%_41%] grid-cols-1 lg:gap-4 sm:gap-3 xs:gap-2 gap-3 pt-8">
          <div className={classNames(styles.description, "flex flex-col items-center text-center")}>
            <Image src={Images.Figma} alt="figma" />
            <div className="flex flex-col gap-2 ">
              <h6 className="">Figma</h6>
              <span className="text-xs text-gray-500 text-center">UI Design, prototyping</span>
            </div>
          </div>
          <div className={classNames(styles.description, "flex flex-col items-center txt-center")}>
            <Image src={Images.Zepline} alt="figma" />
            <div className="flex flex-col gap-2 ">
              <h6 className="">Zepline</h6>
              <span className="text-xs text-gray-500 text-center">Design Workplace</span>
            </div>
          </div>
          <div className={classNames(styles.description, "flex flex-col items-center text-center")}>
            <Image src={Images.Airtable} alt="figma" />
            <div className="flex flex-col gap-2 ">
              <h6 className="">Airtable</h6>
              <span className="text-xs text-gray-500 text-center">Next-gen App Builder</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2  lg:grid-cols-[41%_41%_41%] grid-cols-1 lg:gap-4 sm:gap-3 xs:gap-2 gap-3 pt-8">
          <div className={classNames(styles.description, "flex flex-col items-center text-center")}>
            <Image src={Images.VSCode} alt="figma" className="pt-3" />
            <div className="flex flex-col gap-2 pt-2 ">
              <h6 className="">VS Code</h6>
              <span className="text-xs text-gray-500 text-center">Code Editor</span>
            </div>
          </div>
          <div className={classNames(styles.description, "flex flex-col items-center text-center")}>
            <Image src={Images.Shopify} alt="figma" />
            <div className="flex flex-col gap-2 ">
              <h6 className="">Shopify</h6>
              <span className="text-xs text-gray-500 text-center">E-commerce Platform</span>
            </div>
          </div>
          <div className={classNames(styles.description, "flex flex-col items-center text-center")}>
            <Image src={Images.Notion} alt="figma" />
            <div className="flex flex-col gap-2 ">
              <h6 className="">Notion</h6>
              <span className="text-xs text-gray-500 text-center">Project Management</span>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

  <div className={classNames(styles.stepItem, "flex items-center gap-4")}>

    <div className={classNames(styles.content, "flex flex-col gap-2")}>
      <h4>Latest Projects</h4>
      <div className="flex flex-col">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1  lg:grid-cols-[50%_50%] grid-cols-1 lg:gap-4 sm:gap-3 xs:gap-2 gap-3 pt-8">
          <div className={classNames(styles.description, "flex flex-col gap-4 p-6")}>
            <div className="flex gap-5">
              <Image src={Images.Car} alt="car" />
              <div>
                <h6>Website Prototype</h6>
                <span>Created a responsive, accessible e-learning platform.</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Icons.Attach />
              <span style={{ "color": "#516CF7" }} className="text-bold-500">https://cnib.ca</span>
            </div>

          </div>
          <div className={classNames(styles.description, "flex flex-col gap-4 p-6")}>
            <div className="flex gap-5">
              <Image src={Images.Fitonist} alt="car" />
              <div>
                <h6>Website Prototype</h6>
                <span>Created a responsive, accessible e-learning platform.</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Icons.Attach />
              <span style={{ "color": "#516CF7" }} className="text-bold-500">https://fitonist.com</span>
            </div>

          </div>
        </div>

        <div className="grid lg:grid-cols-2 sm:grid-cols-1  lg:grid-cols-[50%_50%] grid-cols-1 lg:gap-4 sm:gap-3 xs:gap-2 gap-3 pt-8">
          <div className={classNames(styles.description, "flex flex-col gap-4 p-6")}>
            <div className="flex gap-5">
              <Image src={Images.Chatbot} alt="car" />
              <div>
                <h6>Website Prototype</h6>
                <span>Created a responsive, accessible e-learning platform.</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Icons.Attach />
              <span style={{ "color": "#516CF7" }} className="text-bold-500">https://deepai.org</span>
            </div>

          </div>
          <div className={classNames(styles.description, "flex flex-col gap-4 p-6")}>
            <div className="flex gap-5">
              <Image src={Images.Security} alt="car" />
              <div>
                <h6>Website Prototype</h6>
                <span>Created a responsive, accessible e-learning platform.</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Icons.Attach />
              <span style={{ "color": "#516CF7" }} className="text-bold-500">https://kaspersky.com</span>
            </div>

          </div>
        </div>

      </div>

    </div>

  </div>




</div>

</div>
      </div>
    </div >
  );
};

export default Profile;
