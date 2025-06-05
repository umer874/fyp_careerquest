import FellowDashboardWrapper from "components/fellow/dashboardWrapper";
import { GetCookieUser } from "utils/server-side-helper";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: Partial<LayoutProps>) => {
  //const user = await GetCookieUser();
  return (
    <FellowDashboardWrapper>{children}</FellowDashboardWrapper>
  );
};

export default Layout;
