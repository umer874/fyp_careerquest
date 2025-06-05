import { Notification } from "_shared/types/notification";
import { Icons, Images } from "assets";
import classNames from "classnames";
import Spinner from "components/common/spinner";
import { useOnScroll } from "hooks/useOnScroll";
import moment from "moment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  GetAllNotificationsService,
  GetUnReadNotificationCountService,
  MarkNotificationsAsReadService,
} from "services/notification";
import { socket } from "services/socket";
import { NotificationType } from "utils/enum";
import { formatTime } from "utils/helper";
import styles from "./style.module.scss";

const NotificationsDropdown = () => {
  const [endReach, onScroll] = useOnScroll("notification-scrollableDiv");

  const pageRef = useRef(1);
  const isCountUpdated = useRef<boolean>(false);
  const notificationsRef = useRef<Notification[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      isCountUpdated.current = false;
      setNotificationCount(0);
      if (notificationCount > 0) {
        handleMarkAsRead();
      }
    }
  };

  const handleGetAllNotifications = () => {
    GetAllNotificationsService({
      page: pageRef.current,
      limit: 10,
    })
      .then(
        ({
          data: {
            data: { data, meta },
          },
          status,
        }) => {
          if (status) {
            let tempArr = [...notificationsRef.current, ...data];
            notificationsRef.current = tempArr;
            setNotifications(tempArr);
            if (meta?.totalPages > meta?.currentPage) {
              setLoadMore(true);
            } else {
              setLoadMore(false);
            }
          }
        }
      )
      .catch((err) => {})
      .finally(() => {
        setInitialLoading(false);
        setLoading(false);
      });
  };

  const handleGetNotificationCount = () => {
    GetUnReadNotificationCountService()
      .then(({ data, status }) => {
        if (status) {
          setNotificationCount(data?.data);
        }
      })
      .catch((err) => {});
  };

  const handleMarkAsRead = () => {
    MarkNotificationsAsReadService()
      .then(() => {})
      .catch((err) => {});
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("receive-notification", (data: Notification) => {
        if (
          !isCountUpdated.current ||
          notificationsRef.current.filter((itm) => itm.id === data.id)
            .length === 0
        ) {
          setNotificationCount((prev) => prev + 1);
          isCountUpdated.current = true;
        }
        let tempArr = notificationsRef.current.filter(
          (notify) => notify.id !== data.id
        );
        tempArr.unshift(data);
        notificationsRef.current = tempArr;
        setNotifications(tempArr);
      });
    }
  }, [socket]);

  useEffect(() => {
    handleGetNotificationCount();
    handleGetAllNotifications();
  }, []);

  useEffect(() => {
    if (endReach && loadMore && !loading && !initialLoading) {
      setLoading(true);
      pageRef.current = pageRef.current + 1;
      handleGetAllNotifications();
    }
  }, [endReach]);

  return (
    <div className={classNames(styles.dropdown)} ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={classNames(styles.bellIconContainer)}
      >
        <Icons.Notification />
        {notificationCount > 0 ? (
          <div className={classNames(styles.bellIconWrapper)}>
            <span>{notificationCount > 9 ? "9+" : notificationCount}</span>
          </div>
        ) : null}
      </div>
      {isOpen && (
        <div className={classNames(styles.dropdownMenu, "bg-white")}>
          <h5 className={classNames(styles.heading)}>Notifications</h5>

          <div
            className={classNames(styles.itemsContainer)}
            onScroll={onScroll}
            id="notification-scrollableDiv"
          >
            {notifications?.map((item, index) => (
              <div
                key={index}
                className={classNames(
                  styles.item,
                  "flex justify-between items-center"
                )}
              >
                <div className="flex items-center gap-2">
                  <div>
                    {item.type === NotificationType.Event ? (
                      <div className={classNames(styles.eventContainer)}>
                        <Icons.Calendar />
                      </div>
                    ) : item.type === NotificationType.MentorAssigned ||
                      item.type === NotificationType.CoachAssigned ? (
                      <div className={classNames(styles.eventContainer)}>
                        <Icons.ConfirmationIcon />
                      </div>
                    ) : item.type === NotificationType.Job ? (
                      <div className={classNames(styles.eventContainer)}>
                        <Icons.Briefcase />
                      </div>
                    ) : (
                      <div className={classNames(styles.imgContainer)}>
                        <Image
                          src={
                            item.user.profile_asset
                              ? item.user.profile_asset.full_path
                              : Images.DefaultAvatar
                          }
                          alt="user-img"
                          height={50}
                          width={50}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <h6>
                      {item.type === NotificationType.Event
                        ? "Upcoming Event Reminder"
                        : item.type === NotificationType.MentorAssigned
                        ? "Admin Assignment Confirmation"
                        : item.type === NotificationType.CoachAssigned
                        ? "Admin Assignment Confirmation"
                        : item.type === NotificationType.Job
                        ? "New Job Opportunity"
                        : item.type === NotificationType.Message
                        ? "New Message"
                        : "New Message from Your Mentor"}
                    </h6>
                    <span>
                      {item?.type === NotificationType.Event
                        ? `Don’t forget! ${
                            item?.event?.title
                          } is happening tomorrow at ${formatTime(
                            item?.event?.start_time
                          )}.`
                        : item?.type === NotificationType.MentorAssigned ||
                          item?.type === NotificationType.CoachAssigned
                        ? `You’ve been assigned a new ${
                            item?.type === NotificationType.MentorAssigned
                              ? "mentor"
                              : "coach"
                          }. Connect with ${item?.user?.first_name} ${
                            item?.user?.last_name
                          } for personalized guidance.`
                        : item?.type === NotificationType.Job
                        ? `A new job opportunity, ${item?.job?.title}, is available.`
                        : `You have a new message from ${item?.user?.first_name}.`}
                    </span>
                  </div>
                </div>

                <span className="text-nowrap">
                  {moment(item?.created_at).fromNow()}
                </span>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center mt-3">
              <Spinner />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
