"use client";
import classNames from "classnames";
import NoContentCard from "../noContentCard";
import styles from "./style.module.scss";

interface CustomTableProps {
  heads: Array<string>;
  title: string;
  children: any;
  isEmpty?: boolean;
  loading: boolean;
}

const CustomTable = ({
  heads,
  title,
  children,
  isEmpty,
  loading,
}: CustomTableProps) => {
  return (
    <div className={classNames("table-responsive")}>
      <table
        className="table w-full"
        style={{ minWidth: "760px", margin: "0px" }}
      >
        <thead>
          <tr style={{ height: "48px" }}>
            {heads?.map((item: string, inx: number) => {
              return (
                <th
                  className={classNames(
                    inx === 0 ? "ps-4" : "ps-2",
                    inx === heads?.length - 1 ? "pe-4" : "pe-2",
                    styles.tableHead,
                    inx === 0
                      ? "sticky-col first-col"
                      : inx === 1
                      ? "sticky-col second-col"
                      : ""
                  )}
                  key={inx}
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {isEmpty && !loading ? (
        <div className={classNames("my-5")}>
          <NoContentCard
            label1="No Data Found"
            label2={`There is no data available in the "${title}" table`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CustomTable;
