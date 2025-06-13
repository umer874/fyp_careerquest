"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import Image from "next/image";
import { Images } from "assets";
import AuthSlider from "components/auth/authSlider";
import { routeConstant } from "routes/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense,ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  return (
    <>
      <div className={classNames(styles.auth_layout_wrapper)}>
        <div className={classNames(styles.customContainer)}>
          <main
            className={classNames(
              styles.auth_layout_main,
              "md:grid grid-cols-12 lg:gap-16 gap-8"
            )}
          >
            <div className="lg:col-span-5 md:col-span-6 col-span-12 h-full flex flex-col">
              {pathname !== routeConstant.signUp.path && (
                <div className={classNames(styles.logo, "pt-12")}>
                  <Link href={routeConstant.home.path}>
                    <Image
                      width={150}
                      height={105}
                      src={Images.Careerimg}
                      alt="logo"
                    />
                  </Link>
                </div>
              )}
              <Suspense>
                <div className="flex items-center h-full">{children}</div>
              </Suspense>
            </div>
            <div
              className={classNames(
                styles.auth_layout_content,
                "hidden md:block lg:col-span-7 col-span-6"
              )}
            >
              <AuthSlider />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
