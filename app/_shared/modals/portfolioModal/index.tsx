import CustomModal from "components/common/customModal";
import styles from "./style.module.scss";
import classNames from "classnames";
import CustomInput from "components/common/customInput";
import CustomTextArea from "components/common/customTextArea";
import CustomFileUpload from "components/common/customFileUpload";
import { useFormik } from "formik";
import { CreatePortfolioVS, UpdatePortfolioVS } from "utils/validation";
import {
  CreatePortfolioService,
  UpdatePortfolioService,
} from "services/portfolio";
import { handleErrors } from "utils/helper";
import { toastMessage } from "components/common/toast";
import { CreateProjectService, UpdateProjectService } from "services/project";
import { CreatePortfolio } from "_shared/types/portfolio";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText?: string;
  isProject?: boolean;
  item?: any;
  lists?: any;
  setLists?: (val: any[]) => void;
  forceReload?: boolean;
}

const PortfolioModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  isProject,
  lists,
  setLists,
  item,
  forceReload,
}: PortfolioModalProps) => {
  const initialValues: CreatePortfolio = {
    title: item?.title ?? "",
    description: item?.description ?? "",
    file: null,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: item ? UpdatePortfolioVS : CreatePortfolioVS,
    onSubmit: () => {
      handleCreatePortfolio();
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
    resetForm,
  } = formik;

  const handleCreatePortfolio = () => {
    setSubmitting(true);
    if (!isProject) {
      let formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.file) formData.append("portfolio_asset", values.file);

      if (item) {
        UpdatePortfolioService(item.id, formData)
          .then(({ data, status }) => {
            if (status) {
              if (lists) {
                let temp = [...lists];
                let index = temp.findIndex((i) => i.id === item.id);
                temp[index] = data?.data;
                setLists?.(temp);
              }

              if (forceReload) {
                window.location.reload();
              }

              toastMessage("success", "Portfolio updated successfully");
              onClose();
            }
          })
          .catch((err) => {
            handleErrors(err);
          })
          .finally(() => setSubmitting(false));
      } else {
        CreatePortfolioService(formData)
          .then(({ data, status }) => {
            if (status) {
              if (lists) {
                let temp = [...lists];
                temp.unshift(data?.data);
                setLists?.(temp);
              }
              resetForm();
              toastMessage("success", "Portfolio created successfully");
              onClose();
            }
          })
          .catch((err) => {
            handleErrors(err);
          })
          .finally(() => setSubmitting(false));
      }
    } else {
      let formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.file) formData.append("project_asset", values.file);
      if (item) {
        UpdateProjectService(item.id, formData)
          .then(({ data, status }) => {
            if (status) {
              if (lists) {
                let temp = [...lists];
                let index = temp.findIndex((i) => i.id === item.id);
                temp[index] = data?.data;
                setLists?.(temp);
              }
              if (forceReload) {
                window.location.reload();
              }

              toastMessage("success", "Project updated successfully");
              onClose();
            }
          })
          .catch((err) => {
            handleErrors(err);
          })
          .finally(() => setSubmitting(false));
      } else {
        CreateProjectService(formData)
          .then(({ data, status }) => {
            if (status) {
              if (lists) {
                let temp = [...lists];
                temp.unshift(data?.data);
                setLists?.(temp);
              }
              resetForm();
              toastMessage("success", "Project created successfully");
              onClose();
            }
          })
          .catch((err) => {
            handleErrors(err);
          })
          .finally(() => setSubmitting(false));
      }
    }
  };

  return (
    <CustomModal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showBackButton={false}
      customContentContainer="noSidePadding"
      actionButtonText={buttonText}
      onNext={handleSubmit}
      loading={isSubmitting}
    >
      <div className={classNames(styles.modalContentContainer)}>
        <div className={classNames(styles.content)}>
          <form>
            <CustomInput
              required
              label={isProject ? "Project Title" : "Portfolio Title"}
              type="text"
              name="title"
              placeholder="Add your title here"
              customInputContainer="white-bg-input-max-height"
              value={values.title}
              onChange={handleChange("title")}
              error={touched.title && errors.title ? errors.title : ""}
            />
            <CustomTextArea
              label="Description"
              placeholder="Write something about your portfolio"
              rows={6}
              required
              value={values.description}
              onChange={handleChange("description")}
              error={
                touched.description && errors.description
                  ? errors.description
                  : ""
              }
            />
            <div className={classNames("flex flex-col gap-2")}>
              <p className="labelSmall">
                Drop Your {isProject ? "Project" : "Portfolio"} File{" "}
                <span>*</span>
              </p>
              <CustomFileUpload
                accept={{
                  "application/pdf": [],
                  "image/*": [],
                  "video/*": [],
                }}
                initialPreview={
                  isProject
                    ? item?.project_asset?.full_thumbnail_path
                    : item?.portfolio_asset?.full_thumbnail_path
                }
                error={
                  item?.project_asset?.full_thumbnail_path ||
                  item?.portfolio_asset?.full_thumbnail_path
                    ? ""
                    : touched.file && errors.file
                    ? errors.file
                    : ""
                }
                onFileChange={(file) => formik.setFieldValue("file", file)}
                onRemove={() => formik.setFieldValue("file", null)}
                previewType={
                  isProject
                    ? item?.project_asset?.type
                    : item?.portfolio_asset?.type
                }
              />
            </div>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default PortfolioModal;
