"use client";
import CustomButton from "components/common/customButton";
import ConfirmationModal from "modals/confirmationModal";
import JobApplicationModal from "modals/jobApplicationModal";
import JobApplicationStepTwo from "modals/jobApplicationStepTwo";
import { usePathname } from "next/navigation";
import { useRouter } from "next13-progressbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { routeConstant } from "routes/constants";
import { ApplyJobService } from "services/job";
import { handleErrors } from "utils/helper";
import { JobApplicationStep11,JobApplicationStep22 } from "_shared/types/user";

interface ApplyJobButtonProps {
  company: any;
  id: string;
}

const ApplyJobButton = ({ company, id }: ApplyJobButtonProps) => {
  const { auth } = useSelector((state: any) => state.root);
  const router = useRouter();
  const pathname = usePathname();
  const [jobApplicationModal, setJobApplicationModal] =
    useState<boolean>(false);
  const [jobApplicationStepTwo, setJobApplicationStepTwo] =
    useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [step1Values, setStep1Values] = useState<JobApplicationStep11>();
  const [step2Values, setStep2Values] = useState<JobApplicationStep22>();
  const [loading, setLoading] = useState<boolean>(false);

  const openSuccessModal = () => {
    setSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setSuccessModal(false);
  };

  const openJobModal = () => {
    if (auth?.isLoggedIn) {
      setJobApplicationModal(true);
    } else {
      router.push(routeConstant.login.path);
    }
  };

  const closeJobModal = () => {
    setJobApplicationModal(false);
  };

  const openJobStep2 = () => {
    setJobApplicationStepTwo(true);
  };

  const closeJobStep2 = () => {
    setJobApplicationStepTwo(false);
  };

  const handleNavigateJobs = () => {
    if (pathname.includes("fellow")) {
      router.push(routeConstant.fellow.jobs.path);
    } else {
      router.push(routeConstant.insights.path);
    }
  };

  const handleSubmit = (values: JobApplicationStep22) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("email", step1Values?.email ?? "");
    formData.append("phonenumber", step1Values?.phonenumber ?? "");
    formData.append("resume", values?.resume as Blob);
    formData.append("cover_letter", values?.cover_letter as Blob);
    if (values?.projects && values?.projects?.length > 0) {
      formData.append("projects", JSON.stringify(values?.projects));
    }

    if (values?.portfolios && values?.portfolios?.length > 0) {
      formData.append("portfolios", JSON.stringify(values?.portfolios));
    }

    ApplyJobService(formData, id)
      .then(({ data, status }) => {
        if (status) {
          closeJobStep2();
          openSuccessModal();
        }
      })
      .catch((err) => handleErrors(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <CustomButton
        title="Apply Now"
        containerStyle="w-full bg-green"
        onClick={openJobModal}
      />
      <JobApplicationModal
        title="Job Application"
        isOpen={jobApplicationModal}
        onClose={() => {
          closeJobModal();
          setStep1Values(undefined);
        }}
        onNext={() => {
          closeJobModal();
          openJobStep2();
        }}
        buttonText="Next"
        step1Values={step1Values}
        setStep1Values={setStep1Values}
      />

      <JobApplicationStepTwo
        title="Job Application"
        isOpen={jobApplicationStepTwo}
        onClose={closeJobStep2}
        onBackClick={() => {
          closeJobStep2();
          openJobModal();
        }}
        onNext={(values) => {
          handleSubmit(values);
        }}
        buttonText="Submit"
        step2Values={step2Values}
        setStep2Values={setStep2Values}
        submitLoading={loading}
      />

      <ConfirmationModal
        isSuccessModal
        title="Job Application Successful"
        heading="Your Application Was Sent to"
        headingSecondary={company}
        description="You can keep track of your application in the Applied tab of My Jobs"
        isOpen={successModal}
        onClose={closeSuccessModal}
        actionButtonText="Browse More Job"
        onConfirm={handleNavigateJobs}
      />
    </>
  );
};

export default ApplyJobButton;
