"use client";
import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import Image from "next/image";
import CustomBadge from "components/common/customBadge";
import { Icons, Images } from "assets";
import CustomButton from "components/common/customButton";
import useUpdateToken from "hooks/useUpdatedToken";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";

interface UserInfoCardProps {
  user: any;
  updatedToken: RefreshToken;
}

const UserInfoCard = ({ user, updatedToken }: UserInfoCardProps) => {
  const router = useRouter();

  useUpdateToken(updatedToken, () => {}, []);

  return (
    <div className={classNames(styles.contactCard)}>
      <div
        className={classNames(
          styles.header,
          "flex xs:flex-row flex-col justify-between items-center flex-wrap"
        )}
      >
        <div className="flex xs:flex-row flex-col xs:justify-start justify-center items-center gap-2">
          <div className={classNames(styles.imgContainer)}>
            <Image
              width={72}
              height={72}
              src={user?.profile_asset?.full_path ?? Images.DefaultAvatar}
              alt="profile-img"
            />
          </div>
          <div className="flex flex-col xs:items-start items-center">
            <h5>
              {user?.first_name} {user?.last_name}
            </h5>
            <CustomBadge title="Fellow" />
          </div>
        </div>
        <div className="sm:pt-0 pt-2">
          <CustomButton
            containerStyle="outlined-button-light-green"
            title="Send Message"
            onClick={() => {
              router.push(routeConstant.coach.chat.path);
            }}
          />
        </div>
      </div>
      <div
        className={classNames(
          styles.contactDetails,
          "flex items-center flex-wrap sm:gap-5 xs:gap-4 gap-3"
        )}
      >
        <div className="flex items-center gap-2">
          <span className={classNames(styles.iconContainer)}>
            <Icons.PhoneIcon />
          </span>
          <p>{user?.phone} </p>
        </div>
        <span className={classNames(styles.dot)}></span>
        <div className="flex items-center gap-2">
          <span className={classNames(styles.iconContainer)}>
            <Icons.EmailBold />
          </span>
          <p>{user?.email}</p>
        </div>
        <span className={classNames(styles.dot)}></span>
        <div className="flex items-center gap-2">
          <span className={classNames(styles.iconContainer)}>
            <Icons.LocationPinBold />
          </span>
          <p>{user?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
