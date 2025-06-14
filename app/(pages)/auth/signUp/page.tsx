"use client";

import classNames from "classnames";
import CustomButton from "components/common/customButton";
import { toastMessage } from "components/common/toast";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import { useEffect, useState } from "react";
import { routeConstant } from "routes/constants";
import { RegisterService } from "services/auth";
import { RegisterVS, ResetPasswordVS } from "utils/validation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import styles from "./style.module.scss";
import { handleErrors } from "utils/helper";
import { requestNotificationPermission } from "services/firebase";
import { RegisterType ,CreatePasswordType} from "_shared/types/auth";

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [firstStepValues, setFirstStepValues] = useState<RegisterType | null>();
  const [token, setToken] = useState<string | null>(null);
  const [secondStepValues, setSecondStepValues] =
    useState<CreatePasswordType | null>();
  const initialValuesStepOne: RegisterType = {
    firstName: firstStepValues?.firstName ?? "",
    lastName: firstStepValues?.lastName ?? "",
    email: firstStepValues?.email ?? "",
    dob: firstStepValues?.dob ?? "",
    address: firstStepValues?.address ?? "",
    phone: firstStepValues?.phone ?? "",
    coordinates: firstStepValues?.coordinates ?? [],
    checked: firstStepValues?.checked ?? false,
    file: firstStepValues?.file ?? null,
  };

  const initialValuesStepTwo: CreatePasswordType = {
    password: secondStepValues?.password ?? "",
    confirmPassword: secondStepValues?.confirmPassword ?? "",
  };

  const formik = useFormik({
    initialValues: step === 1 ? initialValuesStepOne : initialValuesStepTwo,
    validationSchema: step === 1 ? RegisterVS : ResetPasswordVS,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (step === 1) {
        if (isStepOneValues(values)) {
          setFirstStepValues(values);
          nextStep();
        }
      } else {
        if (isStepTwoValues(values)) {
          completeRegistration(values);
        }
      }
    },
  });

  const isStepOneValues = (
    values: typeof formik.values
  ): values is RegisterType => {
    return (values as RegisterType).firstName !== undefined;
  };

  const isStepTwoValues = (
    values: typeof formik.values
  ): values is CreatePasswordType => {
    return (values as CreatePasswordType).password !== undefined;
  };

  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
    resetForm,
    setFieldValue,
    setSubmitting,
  } = formik;

  const nextStep = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setStep(2);
      } else {
        toastMessage(
          "error",
          "Please fill out all required fields before proceeding."
        );
      }
    });
  };

  const prevStep = () => {
    if (isStepTwoValues(values)) {
      setSecondStepValues(values);
    }
    setStep(1);
  };

  const completeRegistration = (values: CreatePasswordType) => {
    setSubmitting(true);
    if (!firstStepValues || !values) {
      toastMessage(
        "error",
        "Please fill out all required fields before proceeding."
      );
      return;
    }
    const formData = new FormData();
    formData.append("firstname", firstStepValues?.firstName);
    formData.append("lastname", firstStepValues?.lastName);
    formData.append("email", firstStepValues?.email);
    formData.append("dob", firstStepValues?.dob);
    formData.append("address", firstStepValues?.address);
    formData.append("phonenumber", firstStepValues?.phone);
    formData.append(
      "coordinates",
      JSON.stringify(firstStepValues?.coordinates)
    );
    formData.append("password", values?.password);
    if (firstStepValues?.file) {
      formData.append("file", firstStepValues?.file);
    }
    if (token) {
      formData.append("fcm_token", token);
    }
    RegisterService(formData)
      .then(({ data, status }) => {
        if (status) {
          toastMessage("success", "Account Created Successfully");
          resetForm();
          router.push(routeConstant.login.path);
        }
      })
      .catch((err) => {
        handleErrors(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const touchedStepOne = touched as FormikTouched<RegisterType>;
  const touchedStepTwo = touched as FormikTouched<CreatePasswordType>;

  const errorsStepOne = errors as FormikErrors<RegisterType>;
  const errorsStepTwo = errors as FormikErrors<CreatePasswordType>;

  const requestPermission = () => {
    try {
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          const token = await requestNotificationPermission();
          if (token !== null) {
            try {
              setToken(token);
            } catch (err) {
              console.log("Error in adding fcm token", err);
            }
          }
        } else {
          console.log("Unable to get permission to notify.");
        }
      });
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (navigator?.serviceWorker) {
        requestPermission();
      }
      //@ts-error
    }, [navigator?.serviceWorker]);
  }

  return (
    <div className={classNames(styles.auth_page_container)}>
      <div>
        {step === 1 && (
          <StepOne
            handleChange={handleChange}
            values={values as RegisterType}
            touched={touchedStepOne}
            errors={errorsStepOne}
            setFieldValue={setFieldValue}
          />
        )}
        {step === 2 && (
          <StepTwo
            handleChange={handleChange}
            values={values as CreatePasswordType}
            touched={touchedStepTwo}
            errors={errorsStepTwo}
            handleSubmit={handleSubmit}
          />
        )}
        <div className="flex items-center gap-2">
          {step === 2 && (
            <CustomButton
              onClick={prevStep}
              title="Back"
              containerStyle="w-full maxHeighted_btn bg-blue"
            />
          )}
          <CustomButton
            onClick={() => handleSubmit()}
            title={step === 1 ? "Continue" : "Signup"}
            containerStyle="w-full maxHeighted_btn bg-blue"
            loading={isSubmitting}
            disabled={isSubmitting}
          />

        </div>

        {step === 1 && (
          <div className={classNames(styles.link_container)}>
            <p>Already have an account?</p>
            <Link href={routeConstant.login.path}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
