"use client";

import classNames from "classnames";
import CustomCheckbox from "components/common/customCheckbox";
import CustomFileUpload from "components/common/customFileUpload";
import CustomModal from "components/common/customModal";
import Spinner from "components/common/spinner";
import Switch from "components/common/switch";
import { useFormik } from "formik";
import { useOnScroll } from "hooks/useOnScroll";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GetPortfoliosService } from "services/portfolio";
import { GetProjectsService } from "services/project";
import { JobApplicationStep2 } from "utils/validation";
import styles from "./style.module.scss";

interface JobApplicationStepTwoProps {
  isOpen: boolean;
  onClose: () => void;
  onNext?: (values: JobApplicationStep2) => void;
  onBackClick?: () => void;
  title: string;
  buttonText?: string;
  step2Values: JobApplicationStep2 | undefined;
  setStep2Values: (values: JobApplicationStep2) => void;
  submitLoading: boolean;
}

const JobApplicationStepTwo = ({
  isOpen,
  onClose,
  onNext,
  onBackClick,
  title,
  buttonText,
  step2Values,
  setStep2Values,
  submitLoading,
}: JobApplicationStepTwoProps) => {
  const {
    auth: { user },
  } = useSelector((state: any) => state.root);

  const initialValues: JobApplicationStep2 = {
    resume: step2Values?.resume ? step2Values?.resume : null,
    cover_letter: step2Values?.cover_letter ? step2Values?.cover_letter : null,
    portfolios: step2Values?.portfolios ?? [],
    projects: step2Values?.projects ?? [],
  };

  const [portfolioEndReach, portfolioOnScroll] = useOnScroll("portfolios-list");
  const [projectEndReach, proejctOnScroll] = useOnScroll("projects-list");

  const portfolioPageRef = useRef<number>(1);
  const projectPageRef = useRef<number>(1);

  const [portfolios, setPortfolios] = useState<any>([]);
  const [projects, setProjects] = useState<any>([]);
  const [portfolioLoadMore, setPortfolioLoadMore] = useState<boolean>(false);
  const [projectLoadMore, setProjectLoadMore] = useState<boolean>(false);
  const [portfolioLoading, setPortfolioLoading] = useState<boolean>(true);
  const [projectLoading, setProjectLoading] = useState<boolean>(true);
  const [showPortfolio, setShowPortfolio] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: JobApplicationStep2,
    onSubmit: (values) => {
      setStep2Values(values);
      onNext?.(values);
    },
  });

  const { handleSubmit, setFieldValue, resetForm, values, touched, errors } =
    formik;

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPortfolio(e.target.checked);
  };

  const handlePortfolioCheckboxToggle = (id: number) => {
    let filtered = values.portfolios.filter((item: number) => item !== id);
    if (filtered.length === values.portfolios.length) {
      filtered.push(id);
    }
    setFieldValue("portfolios", filtered);
  };

  const handleProjectCheckboxToggle = (id: number) => {
    let filtered = values.projects.filter((item: number) => item !== id);
    if (filtered.length === values.projects.length) {
      filtered.push(id);
    }
    setFieldValue("projects", filtered);
  };

  // const handleGetPortfolios = () => {
  //   setPortfolioLoading(true);
  //   GetPortfoliosService({
  //     page: portfolioPageRef.current,
  //     limit: 10,
  //     id: user?.id,
  //   })
  //     .then(
  //       ({
  //         data: {
  //           data: { data, meta },
  //         },
  //         status,
  //       }) => {
  //         if (status) {
  //           let newPortfolios = [...portfolios, ...data];
  //           setPortfolios(newPortfolios);
  //           if (meta?.totalPages > meta?.currentPage) {
  //             setPortfolioLoadMore(true);
  //           } else {
  //             setPortfolioLoadMore(false);
  //           }
  //         }
  //       }
  //     )
  //     .catch((er) => {})
  //     .finally(() => {
  //       setPortfolioLoading(false);
  //     });
  // };

  // const handleGetProjects = () => {
  //   setProjectLoading(true);
  //   GetProjectsService({
  //     page: projectPageRef.current,
  //     limit: 10,
  //     id: user?.id,
  //   })
  //     .then(
  //       ({
  //         data: {
  //           data: { data, meta },
  //         },
  //         status,
  //       }) => {
  //         if (status) {
  //           let newPortfolios = [...projects, ...data];
  //           setProjects(newPortfolios);
  //           if (meta?.totalPages > meta?.currentPage) {
  //             setProjectLoadMore(true);
  //           } else {
  //             setProjectLoadMore(false);
  //           }
  //         }
  //       }
  //     )
  //     .catch((er) => {})
  //     .finally(() => {
  //       setProjectLoading(false);
  //     });
  // };

  useEffect(() => {
    if (isOpen) {
      setFieldValue("resume", step2Values?.resume ? step2Values?.resume : null);
      setFieldValue(
        "cover_letter",
        step2Values?.cover_letter ? step2Values?.cover_letter : null
      );
      setFieldValue(
        "portfolios",
        step2Values?.portfolios ? step2Values?.portfolios : []
      );
      setFieldValue(
        "projects",
        step2Values?.projects ? step2Values?.projects : []
      );
    } else {
      resetForm();
    }
  }, [isOpen]);

  // useEffect(() => {
  //   if (isOpen) {
  //     handleGetPortfolios();
  //     handleGetProjects();
  //   }
  // }, [isOpen]);

  // useEffect(() => {
  //   if (portfolioEndReach && portfolioLoadMore && !portfolioLoading) {
  //     portfolioPageRef.current++;
  //     handleGetPortfolios();
  //   }
  //   // eslint-disable-next-line
  // }, [portfolioEndReach]);

  // useEffect(() => {
  //   if (projectEndReach && projectLoadMore && !projectLoading) {
  //     projectPageRef.current++;
  //     handleGetProjects();
  //   }
  //   // eslint-disable-next-line
  // }, [projectEndReach]);

  return (
    <CustomModal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showBackButton={true}
      customContentContainer="noSidePadding"
      actionButtonText={buttonText}
      onNext={handleSubmit}
      onBack={onBackClick}
      loading={submitLoading}
    >
      <div className={classNames(styles.modalContentContainer)}>
        <div className={classNames(styles.content)}>
          <form>
            <div>
              <p className="labelSmall">
                Drop Your Resume <span>*</span>
              </p>
              <CustomFileUpload
                onFileChange={(file) => setFieldValue("resume", file)}
                error={touched.resume && errors.resume ? errors.resume : ""}
                onRemove={() => setFieldValue("resume", null)}
              />
            </div>
            <div className="mt-3">
              <p className="labelSmall">Drop Your Cover Letter</p>
              <CustomFileUpload
                onFileChange={(file) => setFieldValue("cover_letter", file)}
                error={
                  touched.cover_letter && errors.cover_letter
                    ? errors.cover_letter
                    : ""
                }
                onRemove={() => setFieldValue("cover_letter", null)}
              />
            </div>
            <div className={classNames(styles.portfolioWrapper)}>
              <div
                className={classNames(
                  styles.toggle,
                  "flex items-center justify-between"
                )}
              >
                <p>Attach Portfolio</p>
                <Switch
                  toggle={showPortfolio}
                  handleChange={handleSwitchChange}
                />
              </div>

              {showPortfolio && (
                <div className={classNames(styles.portfolioContent)}>
                  <div className={classNames(styles.section)}>
                    <p className={classNames(styles.heading)}>Projects</p>
                    <div
                      className={classNames(styles.itemContainer)}
                      id="projects-list"
                      onScroll={proejctOnScroll}
                    >
                      {projects?.map((item: any, ind: number) => (
                        <div
                          key={ind}
                          className={classNames(
                            styles.portfolioItem,
                            "flex items-center justify-between mb-3"
                          )}
                        >
                          <div
                            className={classNames(
                              styles.itemContent,
                              "flex items-center gap-2"
                            )}
                          >
                            <div className={classNames(styles.imgContainer)}>
                              <Image
                                width={70}
                                height={70}
                                src={item?.project_asset?.full_thumbnail_path}
                                alt={item.title}
                              />
                            </div>
                            <p>{item.title}</p>
                          </div>
                          <span className={classNames(styles.check)}>
                            <CustomCheckbox
                              filtersCheckbox="filtersCheckbox"
                              checked={values.projects.includes(item.id)}
                              onChange={() =>
                                handleProjectCheckboxToggle(item.id)
                              }
                            />
                          </span>
                        </div>
                      ))}
                      {projectLoading ? (
                        <div className="flex items-center justify-center">
                          <Spinner />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className={classNames(styles.section)}>
                    <p className={classNames(styles.heading)}>Portfolios</p>
                    <div
                      className={classNames(styles.itemContainer)}
                      id="portfolios-list"
                      onScroll={portfolioOnScroll}
                    >
                      {portfolios?.map((item: any, ind: number) => (
                        <div
                          key={ind}
                          className={classNames(
                            styles.portfolioItem,
                            "flex items-center justify-between mb-3"
                          )}
                        >
                          <div
                            className={classNames(
                              styles.itemContent,
                              "flex items-center gap-2"
                            )}
                          >
                            <div className={classNames(styles.imgContainer)}>
                              <Image
                                width={70}
                                height={70}
                                src={item?.portfolio_asset?.full_thumbnail_path}
                                alt={item.title}
                              />
                            </div>
                            <p>{item.title}</p>
                          </div>
                          <span className={classNames(styles.check)}>
                            <CustomCheckbox
                              filtersCheckbox="filtersCheckbox"
                              checked={values.portfolios.includes(item.id)}
                              onChange={() =>
                                handlePortfolioCheckboxToggle(item.id)
                              }
                            />
                          </span>
                        </div>
                      ))}
                      {portfolioLoading ? (
                        <div className="flex items-center justify-center">
                          <Spinner />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default JobApplicationStepTwo;
