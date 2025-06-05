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
import { UpdateExperienceVS } from "utils/validation";
import styles from "../style.module.scss";

const Experience = () => {
  const {
    auth: { user, isLoggedIn, token, refreshToken },
  } = useSelector((state: any) => state.root);
  const [cookie, setCookie] = useCookies();

  const dispatch = useDispatch();

  const initialValues: UpdateExperienceType = {
    exps:
      user?.experiences?.length > 0
        ? user?.experiences
        : [
            {
              institute: "",
              designation: "",
              // @ts-error
              from: new Date(),
              // @ts-error
              to: new Date(),
            },
          ],
  };

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: initialValues,
    validationSchema: UpdateExperienceVS,
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

    let tempExperiences = [];

    for (let i = 0; i < values.exps.length; i++) {
      let tempObj = {
        institute: values.exps[i].institute,
        designation: values.exps[i].designation,
        from: new Date(values.exps[i].from).toISOString(),
        to: new Date(values.exps[i].to).toISOString(),
      };
      tempExperiences.push(tempObj);
    }

    const formData = new FormData();
    formData.append("experiences", JSON.stringify(tempExperiences));

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

  const addExperience = () => {
    setFieldValue("exps", [
      ...values.exps,
      { institute: "", designation: "", from: new Date(), to: new Date() },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    const newExperiences = [...values.exps];
    newExperiences.splice(index, 1);
    formik.setFieldValue("exps", newExperiences);
  };

  return (
    <section className={classNames(styles.sectionContainer)}>
      <h6>Professional Experience</h6>
      <form
        className={classNames(styles.profileForm, "mt-4")}
        onSubmit={(e) => e.preventDefault()}
      >
        {values?.exps?.map((experience, index: number) => (
          <div key={index} className="grid grid-cols-12 gap-3">
            <div className="col-span-12 relative">
              <CustomInput
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                Icon={Icons.WorkIcon}
                IconDirection="left"
                label="Institute"
                placeholder="University of Springfield"
                required
                value={experience.institute}
                onChange={handleChange("exps." + index + ".institute")}
                error={
                  touched.exps?.[index]?.institute &&
                  // @ts-error
                  errors.exps?.[index]?.institute
                    ? // @ts-error
                      errors.exps?.[index]?.institute
                    : ""
                }
              />
              {values?.exps?.length > 1 && (
                <Icons.Trash
                  className={classNames(styles.trashIcon)}
                  onClick={() => {
                    handleRemoveEducation(index);
                  }}
                />
              )}
            </div>
            <div className="sm:col-span-4 xs:col-span-6 col-span-12">
              <CustomInput
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                Icon={Icons.DesignationIcon}
                IconDirection="left"
                label="Designation"
                placeholder="Associate Professor"
                required
                value={experience.designation}
                onChange={handleChange("exps." + index + ".designation")}
                error={
                  touched.exps?.[index]?.designation &&
                  // @ts-error
                  errors.exps?.[index]?.designation
                    ? // @ts-error
                      errors.exps?.[index]?.designation
                    : ""
                }
              />
            </div>
            <div className="sm:col-span-4 xs:col-span-6 col-span-12">
              <CustomInput
                isDate
                type="date"
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                Icon={Icons.CalendarBlank}
                IconDirection="left"
                label="From"
                placeholder="September 25, 2022"
                required
                value={moment(experience.from).format("YYYY-MM-DD")}
                onChange={handleChange("exps." + index + ".from")}
                error={
                  touched.exps?.[index]?.from &&
                  // @ts-error
                  errors.exps?.[index]?.from
                    ? // @ts-error
                      errors.exps?.[index]?.from
                    : ""
                }
              />
            </div>
            <div className="sm:col-span-4 xs:col-span-6 col-span-12">
              <CustomInput
                isDate
                type="date"
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                Icon={Icons.CalendarBlank}
                IconDirection="left"
                label="To"
                placeholder="February 19, 2023"
                required
                value={moment(experience.to).format("YYYY-MM-DD")}
                onChange={handleChange("exps." + index + ".to")}
                error={
                  touched.exps?.[index]?.to &&
                  // @ts-error
                  errors.exps?.[index]?.to
                    ? // @ts-error
                      errors.exps?.[index]?.to
                    : ""
                }
              />
            </div>
          </div>
        ))}

        <div className={classNames(styles.buttonContainer, "mt-3 pb-3")}>
          <div className="flex justify-between items-center flex-wrap gap-2 w-full">
            <CustomButton
              title="Add New Experience"
              Icon={Icons.PlusIcon}
              IconDirection="left"
              containerStyle="outlined-button-blue maxHeighted_btn"
              onClick={(e) => {
                addExperience();
              }}
            />

            <CustomButton
              title="Save Changes"
              containerStyle="bg-blue maxHeighted_btn"
              loading={isSubmitting}
              disabled={isSubmitting}
              onClick={(e) => {
                handleSubmit();
              }}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Experience;
