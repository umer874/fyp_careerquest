import FellowDashboardWrapper from "components/fellow/dashboardWrapper";
import { GetCookieUser } from "utils/server-side-helper";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: Partial<LayoutProps>) => {
  const user = await GetCookieUser();
  return (
    <FellowDashboardWrapper user={user}>{children}</FellowDashboardWrapper>
  );
};

export default Layout;
