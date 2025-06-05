import classNames from "classnames";
import styles from "./style.module.scss";
import { DOTS, usePagination } from "hooks/usePagination";
import { Icons } from "assets";

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  className?: string;
  displayArrow?: boolean;
  disablePaginationInfo?: boolean;
};

const CustomPagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
  displayArrow = true,
  disablePaginationInfo = false,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange || paginationRange.length < 2) {
    return null;
  }

  const lastPage = Math.ceil(totalCount / pageSize);

  const onNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div
      className={classNames(
        styles.paginationContainer,
        "flex items-center",
        disablePaginationInfo ? "justify-center" : "justify-between"
      )}
    >
      {!disablePaginationInfo && (
        <span className={classNames(styles.paginationInfo)}>
          {`${(currentPage - 1) * pageSize + 1}-${Math.min(
            currentPage * pageSize,
            totalCount
          )} of ${totalCount} items`}
        </span>
      )}
      <ul className={classNames("ps-0", styles.paginationItems, className)}>
        {displayArrow && (
          <li
            className={classNames(styles.arrowContainer, {
              [styles.disabled]: currentPage === 1,
            })}
            onClick={currentPage > 1 ? onPrevious : undefined}
          >
            <Icons.ChevLeft
              className={classNames(styles.iconStyle, {
                [styles.disabledIcon]: currentPage === 1,
              })}
            />
          </li>
        )}

        {paginationRange.map((pageNumber, idx) => (
          <li
            key={idx}
            className={classNames(styles.paginationItem, {
              [styles.active]: pageNumber === currentPage,
            })}
            onClick={() =>
              pageNumber !== DOTS ? onPageChange(Number(pageNumber)) : undefined
            }
          >
            {pageNumber === DOTS ? "…" : pageNumber}
          </li>
        ))}

        {displayArrow && (
          <li
            className={classNames(styles.arrowContainer, {
              [styles.disabled]: currentPage === lastPage,
            })}
            onClick={currentPage < lastPage ? onNext : undefined}
          >
            <Icons.ChevRight
              className={classNames(styles.iconStyle, {
                [styles.disabledIcon]: currentPage === lastPage,
              })}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default CustomPagination;
