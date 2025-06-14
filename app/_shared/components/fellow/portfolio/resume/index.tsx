"use client";

import classNames from "classnames";
import CustomButton from "components/common/customButton";
import CustomFileUpload from "components/common/customFileUpload";
import PdfViewer from "components/common/pdfViewer";
import Spinner from "components/common/spinner";
import { toastMessage } from "components/common/toast";
import ConfirmationModal from "modals/confirmationModal";
import { useRouter } from "next13-progressbar";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setAuthReducer } from "redux/reducers/authSlice";
import { routeConstant } from "routes/constants";
//import { AddUpdateResumeService, DeleteResumeService } from "services/user";
import { PortfolioTabs } from "utils/constants";
import { handleErrors } from "utils/helper";
import styles from "../style.module.scss";

interface PortfolioProps {
  userCookie: any;
}

const UploadResumePage = ({ userCookie }: PortfolioProps) => {
  const { auth } = useSelector((state: any) => state.root);

  const router = useRouter();
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies();

  const [activeTab, setActiveTab] = useState<string>(
    routeConstant.fellow.resume.path
  );
  const [oldResume, setOldResume] = useState<string | null>(
    userCookie?.resume_asset ?? null
  );
  const [fileData, setFileData] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(
    userCookie?.resume_asset ?? null
  );
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [width, setWidth] = useState<number | undefined>(0);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleTabChange = (tabValue: string) => {
    router.push(tabValue);
    setActiveTab(tabValue);
  };

  const handleFileChange = (
    file: File | null,
    preview: string | null,
    isDirectUpload?: boolean
  ) => {
    if (file) {
      setFileData(file);
      setFilePreview(preview);
      if (isDirectUpload) {
        handleUpload(file);
      }
    } else {
      setError("File upload failed");
    }
  };

  const handleRemoveFile = () => {
    setFileData(null);
    setFilePreview(null);
    setError(null);
  };

  const handleUpload = (file?: File | null) => {
    if (fileData || file) {
      setLoading(true);
      let finalFile = fileData ?? file;

      let formData = new FormData();
      if (finalFile) {
        formData.append("profile_resume", finalFile);
      }
      // AddUpdateResumeService(formData)
      //   .then(({ data, status }) => {
      //     if (status) {
      //       toastMessage("success", "Resume uploaded successfully");
      //       dispatch(
      //         setAuthReducer({
      //           ...auth,
      //           user: data?.data,
      //         })
      //       );
      //       setCookie(
      //         "user",
      //         JSON.stringify({
      //           isLoggedIn: true,
      //           id: data?.data?.id,
      //           first_name: data?.data?.first_name,
      //           last_name: data?.data?.last_name,
      //           email: data?.data?.email,
      //           role: data?.data?.type,
      //           profile_asset: data?.data?.profile_asset?.full_path ?? "",
      //           resume_asset: data?.data?.resume_asset?.full_path ?? "",
      //         }),
      //         {
      //           path: "/",
      //           maxAge: 3600 * 24 * 30,
      //           sameSite: true,
      //         }
      //       );
      //     }
      //   })
      //   .catch((err) => handleErrors(err))
      //   .finally(() => {
      //     setLoading(false);
      //   });
    } else {
      setError("Please select a file to upload");
    }
  };

  const handleRemove = () => {
    setLoading(true);
    // DeleteResumeService()
    //   .then(({ data, status }) => {
    //     if (status) {
    //       toastMessage("success", "Resume removed successfully");
    //       closeDeleteModal();
    //       handleRemoveFile();
    //       dispatch(
    //         setAuthReducer({
    //           ...auth,
    //           user: {
    //             ...auth?.user,
    //             resume_asset: null,
    //           },
    //         })
    //       );
    //       setCookie(
    //         "user",
    //         JSON.stringify({
    //           isLoggedIn: true,
    //           id: auth?.user?.id,
    //           first_name: auth?.user?.first_name,
    //           last_name: auth?.user?.last_name,
    //           email: auth?.user?.email,
    //           role: auth?.user?.type,
    //           profile_asset: auth?.user?.profile_asset?.full_path ?? "",
    //           resume_asset: "",
    //         }),
    //         {
    //           path: "/",
    //           maxAge: 3600 * 24 * 30,
    //           sameSite: true,
    //         }
    //       );
    //     }
    //   })
    //   .catch((err) => handleErrors(err))
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  const handleResizeObserver = () => {
    const elem = document.getElementById("pdf-wrapper");
    if (!elem) return;
    const computedStyle = getComputedStyle(elem);
    const contentWidth =
      elem.offsetWidth -
      parseFloat(computedStyle.paddingLeft) -
      parseFloat(computedStyle.paddingRight) -
      4;
    setWidth(contentWidth);
  };

  useEffect(() => {
    if (auth?.user?.resume_asset) {
      setOldResume(auth?.user?.resume_asset?.full_path);
      setFilePreview(auth?.user?.resume_asset?.full_path);
    }
  }, [auth?.user?.resume_asset]);

  useEffect(() => {
    let topElem: any = document.getElementById("pdf-wrapper");
    const observer: any = new ResizeObserver(handleResizeObserver).observe(
      topElem
    );
    return () => {
      observer?.unobserve(topElem);
    };
  }, []);

  return (
    <div className={classNames(styles.customContainer)}>
      <div className={classNames(styles.pageDetailWrapper)}>
        <div
          className={classNames(
            "flex flex-col xs:flex-row items-start xs:items-end justify-between gap-3"
          )}
        >
          {/* Tabs */}
          <div
            className={classNames(styles.tabsContainer, "w-full xs:w-[70%]")}
          >
            <div
              className={classNames(
                styles.tabs,
                "flex items-center justify-between gap-5 w-full"
              )}
            >
              {PortfolioTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={classNames(styles.tab, "w-full", {
                    [styles.activeTab]: activeTab === tab.value,
                  })}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div
            className={classNames(styles.filtersContainer, "w-full xs:w-[30%]")}
          >
            <label
              htmlFor="file-replace-btn"
              className={classNames(
                styles.replaceBtn,
                "text-nowrap px-3 ms-auto cursor-pointer"
              )}
            >
              {loading ? (
                <Spinner />
              ) : !oldResume ? (
                "Upload Resume"
              ) : (
                "Replace Resume"
              )}
              <input
                id="file-replace-btn"
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files && !loading) {
                    handleFileChange(
                      e.target.files[0],
                      URL.createObjectURL(e.target.files[0]),
                      true
                    );
                  }
                }}
                className={"hidden"}
              />
            </label>
          </div>
        </div>

        <div
          className={classNames(styles.pdfWrapper, "mx-auto")}
          id="pdf-wrapper"
        >
          {/* Tab Content */}
          {filePreview ? (
            <>
              <PdfViewer filePreview={filePreview} width={width} />
              <div
                className={classNames(
                  styles.actionContainer,
                  "flex items-center justify-end"
                )}
              >
                <div className={classNames("flex items-center gap-2")}>
                  <CustomButton
                    title="Remove"
                    containerStyle="maxHeighted_btn bg-red"
                    onClick={openDeleteModal}
                    disabled={loading}
                  />
                  {oldResume ? (
                    <label
                      htmlFor="file-replace-btn"
                      className={classNames(
                        styles.replaceBtn,
                        "maxHeighted_btn bg-blue cursor-pointer"
                      )}
                    >
                      {loading ? <Spinner /> : "Replace"}

                      <input
                        id="file-replace-btn"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files) {
                            handleFileChange(
                              e.target.files[0],
                              URL.createObjectURL(e.target.files[0])
                            );
                          }
                        }}
                        className={"hidden"}
                      />
                    </label>
                  ) : (
                    <CustomButton
                      title={"Save"}
                      containerStyle="maxHeighted_btn bg-blue"
                      loading={loading}
                      disabled={loading}
                      onClick={() => {
                        handleUpload();
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <CustomFileUpload
              onFileChange={handleFileChange}
              error={error}
              onRemove={handleRemoveFile}
              showPreview={false}
            />
          )}
        </div>
      </div>
      <ConfirmationModal
        isDeleteModal
        title={"Delete Resume"}
        heading="Removal Confirmation"
        description={`Are you sure you want to remove this resume`}
        isOpen={deleteModal}
        onClose={closeDeleteModal}
        actionButtonText="Yes Delete"
        onConfirm={handleRemove}
        loading={loading}
      />
    </div>
  );
};

export default UploadResumePage;
