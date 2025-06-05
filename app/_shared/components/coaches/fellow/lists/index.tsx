"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import { PortfolioTabs } from "utils/constants";
import { useEffect, useState } from "react";
import { routeConstant } from "routes/constants";
import NoContentCard from "components/common/noContentCard";
import PortfolioCard from "components/coaches/portfolioCard";
import moment from "moment";
import { useRouter } from "next13-progressbar";
import PdfViewer from "components/common/pdfViewer";

interface FellowPortfoliosProps {
  user: any;
}

const FellowPortfolios = ({ user }: FellowPortfoliosProps) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>(
    routeConstant.fellow.portfolios.path
  );
  const [width, setWidth] = useState<number | undefined>(0);

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const portfolios = user?.portfolios;
  const projects = user?.projects;
  const resume = user?.resume_asset;

  const handleResizeObserver = () => {
    const elem = document.getElementById("fellow-detail-wrapper");
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
    let topElem: any = document.getElementById("fellow-detail-wrapper");
    const observer: any = new ResizeObserver(handleResizeObserver).observe(
      topElem
    );
    return () => {
      observer?.unobserve(topElem);
    };
  }, []);

  return (
    <div className={classNames(styles.otherDetails)} id="fellow-detail-wrapper">
      <div className={classNames(styles.tabsContainer, "w-full")}>
        <div
          className={classNames(styles.tabs, "flex items-center gap-5 w-full")}
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

      {activeTab === routeConstant.fellow.portfolios.path ? (
        <>
          {portfolios?.length > 0 ? (
            <div
              className={classNames(
                styles.contentContainer,
                "grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 gap-4"
              )}
            >
              {portfolios?.map((item: any) => (
                <PortfolioCard
                  key={item?.id}
                  id={item?.id}
                  img={item?.portfolio_asset?.full_thumbnail_path}
                  title={item?.title}
                  desc={item?.description}
                  date={moment(item?.created_at).format("DD MMMM, YYYY")}
                  type={item?.portfolio_asset?.type}
                  onPreviewClick={() => {
                    router.push(
                      routeConstant.coach.portfolioDetail.path.replace(
                        ":id",
                        item?.id
                      )
                    );
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              className={classNames(
                "h-[200px]  flex items-center justify-center"
              )}
            >
              <NoContentCard
                label1="No Data Found"
                label2={`There is no data available for portfolios`}
              />
            </div>
          )}
        </>
      ) : activeTab === routeConstant.fellow.projects.path ? (
        <>
          {projects?.length > 0 ? (
            <div
              className={classNames(
                styles.contentContainer,
                "grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 gap-4"
              )}
            >
              {projects?.map((item: any) => (
                <PortfolioCard
                  key={item?.id}
                  id={item?.id}
                  img={item?.project_asset?.full_thumbnail_path}
                  title={item?.title}
                  desc={item?.description}
                  date={moment(item?.created_at).format("DD MMMM, YYYY")}
                  type={item?.project_asset?.type}
                  onPreviewClick={() => {
                    router.push(
                      routeConstant.coach.projectDetail.path.replace(
                        ":id",
                        item?.id
                      )
                    );
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              className={classNames(
                "h-[200px]  flex items-center justify-center"
              )}
            >
              <NoContentCard
                label1="No Data Found"
                label2={`There is no data available for projects`}
              />
            </div>
          )}
        </>
      ) : (
        <>
          {resume ? (
            <div className={classNames(styles.contentContainer)}>
              <PdfViewer filePreview={resume?.full_path} width={width} />
              <div
                className={classNames(
                  styles.actionContainer,
                  "flex items-center justify-end"
                )}
              ></div>
            </div>
          ) : (
            <div
              className={classNames(
                "h-[200px]  flex items-center justify-center"
              )}
            >
              <NoContentCard
                label1="No Data Found"
                label2={`There is no resume`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FellowPortfolios;
