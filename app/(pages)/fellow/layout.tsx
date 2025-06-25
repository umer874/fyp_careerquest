import FellowDashboardWrapper from "components/fellow/dashboardWrapper";
import { GetTokensFromCookies, getUserIdFromToken } from "utils/server-side-helper";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  // Get tokens from cookies
  const { token } = await GetTokensFromCookies();
  
  // Get minimal user info from token
  const user = token ? {
    id: await getUserIdFromToken(token),
    // Add other minimal required user properties here
  } : null;

  return (
    <FellowDashboardWrapper user={user}>
      {children}
    </FellowDashboardWrapper>
  );
};

export default Layout;