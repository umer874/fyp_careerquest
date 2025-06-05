import CoachesDashboardWrapper from "components/coaches/dashboardWrapper";
import { cookies } from "next/headers";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: Partial<LayoutProps>) => {
  const nextCookies = await cookies();
  const userCookie = nextCookies.get("user");
  const user = JSON.parse(userCookie?.value ? userCookie.value : "{}");
  return (
    <CoachesDashboardWrapper user={user}>{children}</CoachesDashboardWrapper>
  );
};

export default Layout;
