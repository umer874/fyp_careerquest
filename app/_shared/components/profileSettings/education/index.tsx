"use client";
import { Icons } from "assets";
import classNames from "classnames";
import CustomButton from "components/common/customButton";
import CustomInput from "components/common/customInput";
import { toastMessage } from "components/common/toast";
import { useFormik } from "formik";
import moment from "moment";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setAuthReducer } from "redux/reducers/authSlice";
import { UpdateProfileService } from "services/user";
import { handleErrors } from "utils/helper";
import { UpdateEducationsVS } from "utils/validation";
import styles from "../style.module.scss";

const Education = () => {
  const {
    auth: { user, isLoggedIn, token, refreshToken },
  } = useSelector((state: any) => state.root);
  const [cookie, setCookie] = useCookies();

  const dispatch = useDispatch();

  const initialValues: UpdateEducationType = {
    educations:
      user?.educations?.length > 0
        ? user?.educations
        : [{ institute: "", degree: "", completion_date: new Date() }],
  };

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: initialValues,
    validationSchema: UpdateEducationsVS,
    onSubmit: (values, actions) => {
      handleUpdateProfile();
    },
  });

  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
    setFieldValue,
  } = formik;

  const handleUpdateProfile = () => {
    setSubmitting(true);

    let tempEducations = [];

    for (let i = 0; i < values.educations.length; i++) {
      let tempObj = {
        institute: values.educations[i].institute,
        degree: values.educations[i].degree,
        expected_completion: new Date(
          values.educations[i].completion_date
        ).toISOString(),
      };
      tempEducations.push(tempObj);
    }

    const formData = new FormData();
    formData.append("educations", JSON.stringify(tempEducations));

    UpdateProfileService(formData)
      .then(({ status, data }) => {
        if (status) {
          toastMessage("success", "Profile Updated Successfully");
          dispatch(
            setAuthReducer({
              user: data?.data,
              token: token,
              refreshToken: refreshToken,
              isLoggedIn: isLoggedIn,
            })
          );

          setCookie(
            "user",
            JSON.stringify({
              isLoggedIn: true,
              id: data?.data?.id,
              first_name: data?.data?.first_name,
              last_name: data?.data?.last_name,
              email: data?.data?.email,
              role: data?.data?.type,
              profile_asset: data?.data?.profile_asset?.full_path ?? "",
              resume_asset: data?.data?.resume_asset?.full_path ?? "",
            }),
            {
              path: "/",
              maxAge: 3600 * 24 * 30,
              sameSite: true,
            }
          );
        }
      })
      .catch((err) => {
        handleErrors(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const addEducation = () => {
    setFieldValue("educations", [
      ...values.educations,
      { institute: "", degree: "", completion_date: new Date() },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducations = [...values.educations];
    newEducations.splice(index, 1);
    formik.setFieldValue("educations", newEducations);
  };

  return (
    <section className={classNames(styles.sectionContainer)}>
      <h6>Educational Background</h6>
      <form className={classNames(styles.profileForm, "mt-4")}>
        {values?.educations.map((education, index) => (
          <div key={index} className="grid grid-cols-12 gap-3">
            <div className="col-span-12 relative">
              <CustomInput
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                Icon={Icons.EducationIcon}
                IconDirection="left"
                label="Institute"
                placeholder="University of Springfield"
                required
                value={education.institute}
                onChange={handleChange("educations." + index + ".institute")}
                error={
                  touched.educations?.[index]?.institute &&
                  // @ts-error
                  errors.educations?.[index]?.institute
                    ? // @ts-error
                      errors.educations?.[index]?.institute
                    : ""
                }
              />
              {values?.educations?.length > 1 && (
                <Icons.Trash
                  className={classNames(styles.trashIcon)}
                  onClick={() => {
                    handleRemoveEducation(index);
                  }}
                />
              )}
            </div>
            <div className="xs:col-span-6 col-span-12">
              <CustomInput
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                Icon={Icons.BookIcon}
                IconDirection="left"
                label="Degree"
                placeholder="Bachelor of Science in Computer Science"
                required
                value={education.degree}
                onChange={handleChange("educations." + index + ".degree")}
                error={
                  touched.educations?.[index]?.degree &&
                  // @ts-error
                  errors.educations?.[index]?.degree
                    ? // @ts-error
                      errors.educations?.[index]?.degree
                    : ""
                }
              />
            </div>
            <div className="xs:col-span-6 col-span-12">
              <CustomInput
                isDate
                type="date"
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                Icon={Icons.CalendarBlank}
                IconDirection="left"
                label="Expected Completion Date"
                placeholder="May 11, 2018"
                required
                value={moment(education.completion_date).format("YYYY-MM-DD")}
                onChange={handleChange(
                  "educations." + index + ".completion_date"
                )}
                error={
                  touched.educations?.[index]?.completion_date &&
                  // @ts-error
                  errors.educations?.[index]?.completion_date
                    ? // @ts-error
                      errors.educations?.[index]?.completion_date
                    : ""
                }
              />
            </div>
          </div>
        ))}

        <div className={classNames(styles.buttonContainer, "mt-3 pb-3")}>
          <div className="flex justify-between items-center flex-wrap gap-2 w-full">
            <CustomButton
              title="Add New Education"
              Icon={Icons.PlusIcon}
              IconDirection="left"
              containerStyle="outlined-button-blue maxHeighted_btn"
              onClick={(e) => {
                e.preventDefault();
                addEducation();
              }}
            />

            <CustomButton
              title="Save Changes"
              containerStyle="bg-blue maxHeighted_btn"
              loading={isSubmitting}
              disabled={isSubmitting}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Education;
