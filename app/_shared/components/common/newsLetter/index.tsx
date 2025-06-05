"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import CustomInput from "../customInput";
import { Icons } from "assets";
import CustomButton from "../customButton";

const NewsLetter = () => {
  return (
    <div className={classNames(styles.newsLetter)}>
      <div className="grid grid-cols-12 sm:gap-8 gap-4">
        <div className={classNames(styles.text, "xs:col-span-5 col-span-12")}>
          <h3>Newsletter Subscription</h3>
          <p>
            Stay in the loop! Subscribe to our newsletter for the latest
            features, updates, and news.
          </p>
        </div>
        <div className={classNames(styles.text, "xs:col-span-7 col-span-12")}>
          <CustomInput
            customInputContainer="white-bg-input"
            Icon={Icons.Email}
            label="Email Address"
            placeholder="e.g. abc@example.com"
            required
            value={""}
          />
          <div className="xs:pt-2">
            <CustomButton title="Subscribe" containerStyle="bg-blue w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
