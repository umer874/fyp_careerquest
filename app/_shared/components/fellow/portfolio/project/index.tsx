"use client";
import { Icons } from "assets";
import classNames from "classnames";
import CustomButton from "components/common/customButton";
import NoContentCard from "components/common/noContentCard";
import PortfolioCard from "components/fellow/portfolioCard";
import useUpdateToken from "hooks/useUpdatedToken";
import PortfolioModal from "modals/portfolioModal";
import moment from "moment";
import { useRouter } from "next13-progressbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { routeConstant } from "routes/constants";
import { GetProjectsService } from "services/project";
import { PortfolioTabs } from "utils/constants";
import styles from "../style.module.scss";

interface PortfolioProps {
  list: any[];
  updatedToken: RefreshToken;
  meta: Meta;
}

const ProjectList = ({ list, updatedToken, meta }: PortfolioProps) => {
  const {
    auth: { user },
  } = useSelector((state: any) => state.root);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>(
    routeConstant.fellow.projects.path
  );
  const [listings, setListings] = useState<any[]>(list);
  const [page, setPage] = useState<number>(meta?.currentPage);
  const [totalPages, setTotalPages] = useState<number>(meta?.totalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  const [editPortfolioModal, setEditPortfolioModal] = useState<boolean>(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>(null);

  const openPortfolioModal = () => {
    setPortfolioModal(true);
  };

  const closePortfolioModal = () => {
    setPortfolioModal(false);
  };
  const openEditPortfolioModal = () => {
    setEditPortfolioModal(true);
  };

  const closeEditPortfolioModal = () => {
    setEditPortfolioModal(false);
  };

  const handleTabChange = (tabValue: string) => {
    router.push(tabValue);
    setActiveTab(tabValue);
  };

  const handleGetPortfolios = async (page: number) => {
    setLoading(true);
    GetProjectsService({
      id: user?.id,
      page,
      limit: 9,
    })
      .then(({ data, status }) => {
        if (status) {
          setListings([...listings, ...data?.data]);
          setPage(data?.meta?.currentPage);
          setTotalPages(data?.meta?.totalPages);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useUpdateToken(updatedToken, () => {}, []);

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
            <CustomButton
              Icon={Icons.Portfolio}
              IconDirection="left"
              title="Upload New Project"
              containerStyle="text-nowrap px-3 ms-auto"
              onClick={openPortfolioModal}
            />
          </div>
        </div>

        {/* Tab Content */}
        {listings?.length > 0 ? (
          <div
            className={classNames(
              styles.contentContainer,
              "grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 gap-4"
            )}
          >
            {listings?.map((item) => (
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
                    routeConstant.fellow.projectDetail.path.replace(
                      ":id",
                      item?.id
                    )
                  );
                }}
                onEditClick={() => {
                  setSelectedPortfolio(item);
                  openEditPortfolioModal();
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
        {page < totalPages ? (
          <CustomButton
            title="View More Listings"
            containerStyle="mx-auto mt-5"
            onClick={() => {
              handleGetPortfolios(page + 1);
            }}
            loading={loading}
            disabled={loading}
          />
        ) : null}
      </div>
      <PortfolioModal
        title="Add Project Details"
        isOpen={portfolioModal}
        onClose={closePortfolioModal}
        buttonText="Add to Project"
        lists={listings}
        setLists={setListings}
        isProject
      />
      <PortfolioModal
        title="Edit Project Details"
        isOpen={editPortfolioModal}
        onClose={closeEditPortfolioModal}
        buttonText={"Update Project"}
        item={selectedPortfolio}
        lists={listings}
        setLists={setListings}
        isProject
      />
    </div>
  );
};

export default ProjectList;
