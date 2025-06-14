"use client";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./style.module.scss";
import CustomButton from "components/common/customButton";
import PortfolioModal from "modals/portfolioModal";
import ConfirmationModal from "modals/confirmationModal";
import BackButton from "../back";
import useUpdateToken from "hooks/useUpdatedToken";
import { RefreshToken } from "_shared/types/auth";
import { DeletePortfolioService } from "services/portfolio";
import { handleErrors } from "utils/helper";
import { toastMessage } from "components/common/toast";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";
import { DeleteProjectService } from "services/project";


interface BottomActionsProps {
  isProject?: boolean;
  updatedToken: RefreshToken;
  item: any;
  hideActions?: boolean;
}

const BottomActions = ({
  isProject,
  updatedToken,
  item,
  hideActions = false,
}: BottomActionsProps) => {
  const router = useRouter();

  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openPortfolioModal = () => {
    setPortfolioModal(true);
  };

  const closePortfolioModal = () => {
    setPortfolioModal(false);
  };

  const handleRemove = () => {
    setLoading(true);
    if (isProject) {
      DeleteProjectService(item?.id)
        .then(({ data, status }) => {
          if (status) {
            toastMessage("success", "Project removed successfully");
            closeDeleteModal();
            router.push(routeConstant.fellow.projects.path);
          }
        })
        .catch((err) => handleErrors(err))
        .finally(() => {
          setLoading(false);
        });
    } else {
      DeletePortfolioService(item?.id)
        .then(({ data, status }) => {
          if (status) {
            toastMessage("success", "Portfolio removed successfully");
            closeDeleteModal();
            router.push(routeConstant.fellow.portfolios.path);
          }
        })
        .catch((err) => handleErrors(err))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useUpdateToken(updatedToken, () => {}, []);

  return (
    <>
      <div
        className={classNames(
          styles.actionContainer,
          "flex items-center justify-between gap-2"
        )}
      >
        <BackButton
          label={isProject ? "Back to Project" : "Back to Portfolio"}
        />
        {!hideActions ? (
          <div className={classNames("flex items-center gap-2")}>
            <CustomButton
              title="Remove"
              containerStyle="maxHeighted_btn bg-red"
              onClick={openDeleteModal}
            />
            <CustomButton
              title={isProject ? "Edit Project" : "Edit Portfolio"}
              containerStyle="maxHeighted_btn bg-blue"
              onClick={openPortfolioModal}
            />
          </div>
        ) : null}
      </div>

      <PortfolioModal
        title={isProject ? "Edit Project Details" : "Edit Portfolio Details"}
        isOpen={portfolioModal}
        onClose={closePortfolioModal}
        buttonText={isProject ? "Update Project" : "Update Portfolio"}
        isProject={isProject}
        item={item}
        forceReload={true}
      />

      <ConfirmationModal
        isDeleteModal
        title={isProject ? "Delete Project" : "Delete Portfolio"}
        heading="Removal Confirmation"
        description={`Are you sure you want to remove this ${
          isProject ? "project" : "portfolio"
        }`}
        isOpen={deleteModal}
        onClose={closeDeleteModal}
        actionButtonText="Yes Delete"
        onConfirm={handleRemove}
        loading={loading}
      />
    </>
  );
};

export default BottomActions;
