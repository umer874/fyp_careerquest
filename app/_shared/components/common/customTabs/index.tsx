"use client";

import { useState } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";

type Tab = {
  label: string;
  value: string;
  messageCount?: number;
};

type CustomTabsProps = {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange?: (tabValue: string) => void;
  fullWidthTabs?: boolean;
};

const CustomTabs = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  fullWidthTabs,
}: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab || tabs[0].value
  );

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    if (onTabChange) {
      onTabChange(tabValue);
    }
  };

  return (
    <div className={classNames(styles.tabsContainer)}>
      <div
        className={classNames(styles.tabs, "flex items-center", {
          "justify-between": fullWidthTabs,
        })}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={classNames(
              styles.tab,
              activeTab === tab.value && styles.activeTab,
              "text-center",
              {
                "w-full": fullWidthTabs,
              }
            )}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
            {tab.messageCount && <span> ({tab.messageCount})</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomTabs;
