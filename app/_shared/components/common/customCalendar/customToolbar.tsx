import { format, startOfWeek, endOfWeek, setMonth } from "date-fns";
import styles from "./style.module.scss";
import CustomButton from "../customButton";
import CustomSelect from "../customSelect";
import { Icons } from "assets";
import classNames from "classnames";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const views = ["Month", "Week", "Day"];

const CustomToolbar = (props: any) => {
  const goToBack = () => {
    props.onNavigate("PREV");
  };

  const goToNext = () => {
    props.onNavigate("NEXT");
  };

  const goToToday = () => {
    props.onNavigate("TODAY");
  };

  const handleMonthChange = (selectedMonth: string) => {
    const selectedIndex = months.findIndex((month) =>
      selectedMonth.startsWith(month)
    );
    const updatedDate = setMonth(props.date, selectedIndex);
    props.onNavigate("DATE", updatedDate);
  };

  const handleViewChange = (selectedView: string) => {
    const lowerCaseView = selectedView.toLowerCase();
    props.onView(lowerCaseView);
  };

  const getLabel = () => {
    const { date, view } = props;

    if (view === "day") {
      return format(date, "EEEE, MMM d, yyyy");
    }

    if (view === "week") {
      const start = startOfWeek(date);
      const end = endOfWeek(date);
      return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
    }

    if (view === "month") {
      return format(date, "MMMM yyyy");
    }

    return "";
  };

  const currentYear = props.date.getFullYear();
  const monthsWithYear = months.map((month) => `${month} ${currentYear}`);

  return (
    <div className={classNames(styles.toolbar)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div
            className={classNames(
              styles.actionContainer,
              "flex items-center gap-3"
            )}
          >
            <CustomButton
              containerStyle="btn-lighter-blue-rounded-sm"
              onClick={goToToday}
              title="Today"
            />
            <div className="flex items-center gap-1">
              <span onClick={goToBack}>
                <Icons.ChevLeft />
              </span>
              <span onClick={goToNext}>
                <Icons.ChevRight />
              </span>
            </div>
          </div>
          <CustomSelect
            enableCalendarSelect
            customSelectWrapper="no-border-select"
            defaultActiveItem={`${
              months[props.date.getMonth()]
            } ${currentYear}`}
            options={monthsWithYear.map((monthWithYear) => ({
              title: monthWithYear,
              action: () => handleMonthChange(monthWithYear),
            }))}
            // @ts-ignore
            activeItem={`${months[props.date.getMonth()]} ${currentYear}`}
          />
        </div>

        <CustomSelect
          enableCalendarSelect
          defaultActiveItem={
            props.view.charAt(0).toUpperCase() + props.view.slice(1)
          }
          options={views.map((view) => ({
            title: view,
            action: () => handleViewChange(view),
          }))}
          // @ts-ignore
          activeItem={props.view.charAt(0).toUpperCase() + props.view.slice(1)}
        />
      </div>

      <h5 className={classNames(styles.label)}>{getLabel()}</h5>
    </div>
  );
};

export default CustomToolbar;
